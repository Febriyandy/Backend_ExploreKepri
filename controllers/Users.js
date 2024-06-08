import Users from "../models/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import fs from "fs";
import path from "path";

export const Home = async (req, res) => {
    res.send('Welcome to destinasyik server!');
}

export const getUser = async (req, res) => {
    try {
        const response = await Users.findAll({
            attributes: ['uuid', 'id', 'nama', 'email', 'telepon']
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

export const getUserById = async (req, res) => {
    try {
        const response = await Users.findOne({
            attributes: ['uuid', 'nama', 'email', 'telepon'],
            where: {
                uuid: req.params.id
            }
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

export const createUser = async (req, res) => {
    const { nama, email, password, confPassword } = req.body;
    const role = 'user';
    const existingUser = await Users.findOne({
        where: {
            email: email
        }
    });

    if (existingUser) {
        return res.status(400).json({ msg: "Email sudah terdaftar, silakan masuk." });
    }
    if (password !== confPassword) return res.status(400).json({ msg: "Password dan Confirm Password tidak cocok" });
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    if (!passwordRegex.test(password)) {
        return res.status(400).json({ msg: "Password minimal 8 karakter dan harus terdiri dari huruf kapital, huruf kecil, dan angka." });
    }

    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);
    try {
        await Users.create({
            nama: nama,
            email: email,
            password: hashPassword,
            role: role
        });
        res.status(201).json({ msg: "Register Berhasil" });
    } catch (error) {
        console.error("Error in createUser:", error);
        res.status(400).json({ msg: "Gagal melakukan registrasi", error: error.message });
    }
};

export const updateUser = async (req, res) => {
    try {
        const user = await Users.findOne({
            where: {
                uuid: req.params.id
            }
        });

        if (!user) {
            return res.status(404).json({ msg: "User tidak ditemukan" });
        }

        let url = user.link_foto;
        let fotoName = null;

        if (req.files && req.files.link_foto) {
            const foto = req.files.link_foto;
            fotoName = foto.md5 + path.extname(foto.name);
            url = `${req.protocol}://${req.get('host')}/profil/${fotoName}`;

            await foto.mv(`./public/profil/${fotoName}`);

            if (user.nama_foto) {
                const filepath = `./public/profil/${user.nama_foto}`;
                fs.unlinkSync(filepath);
            }
        }

        const { nama, email, telepon } = req.body;

        await Users.update({
            nama: nama,
            email: email,
            telepon: telepon,
            link_foto: url,
            nama_foto: fotoName,
        }, {
            where: {
                id: user.id
            }
        });

        return res.status(200).json({ msg: "User Updated" });
    } catch (error) {
        return res.status(400).json({ msg: error.message });
    }
};

export const updatePassword = async (req, res) => {
    try {
        const user = await Users.findOne({
            where: {
                uuid: req.params.id
            }
        });

        if (!user) {
            return res.status(404).json({ msg: "User tidak ditemukan" });
        }
        const { oldPassword, newPassword, confPassword } = req.body;

        const isPasswordMatch = await bcrypt.compare(oldPassword, user.password);

        if (!isPasswordMatch) {
            return res.status(401).json({ msg: "Password lama salah" });
        }

        if (newPassword !== confPassword) {
            return res.status(400).json({ msg: "Konfirmasi password baru tidak cocok" });
        }

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
        if (!passwordRegex.test(newPassword)) {
            return res.status(400).json({ msg: "Password minimal 8 karakter dan harus terdiri dari huruf kapital, huruf kecil, dan angka." });
        }

        const salt = await bcrypt.genSalt();
        const hashPassword = await bcrypt.hash(newPassword, salt);

        await Users.update({
            password: hashPassword,
        }, {
            where: {
                id: user.id
            }
        });

        return res.status(200).json({ msg: "Password berhasil diperbarui" });
    } catch (error) {
        return res.status(400).json({ msg: error.message });
    }
};

export const deleteUser = async (req, res) => {
    const user = await Users.findOne({
        where: {
            uuid: req.params.id
        }
    });
    if (!user) return res.status(404).json({ msg: "User tidak ditemukan" });
    try {
        if (user.nama_foto) {
            const filepath = `./public/profil/${user.nama_foto}`;
            fs.unlinkSync(filepath);
        }
        
        await Users.destroy({
            where: {
                id: user.id
            }
        });
        res.status(200).json({ msg: "User Deleted" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};

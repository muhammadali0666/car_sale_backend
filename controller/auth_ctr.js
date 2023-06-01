const { Users } = require("../model")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

Users.sync({ force: false })

const authRegister = async (req, res) => {
    const { username, email, password } = req.body

    const user = await Users.findOne({ where: { email: email } })
    if (user) {
        return res.send("user already exists")
    }
    if (!password.trim().match(/[A-Za-z0-9]+$/g)) {
        return res.send("Password invalid")
    }

    let hash = await bcrypt.hash(password, 12)

    await Users.create({ username, email, password: hash })

    return res.send({
        msg: "Registered!"
    })

}

const authLogin = async (req, res) => {
    try {
        const { email, password } = req.body

        let user = await Users.findOne({ where: { email: email } });

        let founEmail = user.email === email

        if (!founEmail) {
            return res.send("You haven't register")
        }

        let check = await bcrypt.compare(password, user.password)

        if (check) {
            let token = await jwt.sign({ id: user.id, email: user.email, role: user.role },
                process.env.SEKRET_KEY,
                {
                    expiresIn: process.env.TIME
                }
            )
            return res.send({
                msg: "Success",
                token,
            });
        }
        else {
            res.send({
                msg: "Password wrong",
            });
        }
    }
    catch {
        res.send({
            msg: "error",
        });
    }
}

// const getUsers = async(_, res) => {

//     let users = await Users.findAll();
//     res.json(users)
// }

// const getUser = async(req, res) => {
//     const { id } = req.params 

//     let user = await Users.findOne({ where: { id } });
//    return res.json(user)
// }





// const deleteUser = async ( req, res ) => {
//     const { id } = req.params

//     const deletedUser = await Users.destroy({
//         returning: true,
//         plain: true,
//         where: {
//             id
//         }
//     })

//    return res.send("deleted user!")

// }

// const updateUser = async (req, res) => {
//     const { username, email, password } = req.body
//     const { id } = req.params

//     const updatedUser = await Users.update({ username, email, password }, {
//         returning: true,
//         plain: false,
//         where: {
//             id
//         }
//     })

//     return res.send(updatedUser.filter(e => e))

// }



module.exports = {
    // getUsers,
    // deleteUser,
    // updateUser,
    // getUser,
    authRegister,
    authLogin
}
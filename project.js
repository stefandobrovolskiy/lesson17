const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

let users = [
    { id: 1, name: 'Іван' },
    { id: 2, name: 'Марія' },
    { id: 3, name: 'Петро' }
];

app.get('/users', (req, res) => {
    res.json(users);
});

app.get('/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const user = users.find(user => user.id === userId);
    if (user) {
        res.json(user);
    } else {
        res.status(404).send('Користувача не знайдено');
    }
});

app.post('/users', (req, res) => {
    const newUser = req.body;
    users.push(newUser);
    res.status(201).json(newUser);
});

app.delete('/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    users = users.filter(user => user.id !== userId);
    res.sendStatus(204);
});

app.patch('/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const updatedUser = req.body;
    for (let i = 0; i < users.length; i++) {
        if (users[i].id === userId) {
            users[i] = { ...users[i], ...updatedUser };
            res.json(users[i]);
            return;
        }
    }
    res.status(404).send('Користувача не знайдено');
});

app.listen(3002, () => {
    console.log('Сервер запущено на порті 3002');
});

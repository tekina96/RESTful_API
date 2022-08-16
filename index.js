const express = require('express');
const app = express();
const pool = require('./db');

app.use(express.json());  // req.body

// routes

// get all todos
app.get('/todos', async(req, res) => {
    try {
        const allTodos = await pool.query("SELECT * FROM todo");

        res.json(allTodos.rows);
    } catch (err) {
        console.log(err.message);
    }
})

// get a todo
app.get('/todos/:id', async(req,res) => {
    const {id} = req.params;
    try {
        const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [id]);

        res.json(todo.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
})

// create a todo
app.post('/todos', async(req, res) => {
    try {
        const{description} = req.body;
        const newTodo = await pool.query("INSERT INTO todo (description) VALUES ($1) RETURNING *",
        [description]
        );

        res.json(newTodo.rows);

    } catch (err) {
        console.log(err.message);
    }
});


//update a todo
app.put('/todos/:id', async(req,res) => {
    
    try {
        const{id} = req.params; // where
        const{description} = req.body; //set
        const updated_todo = await pool.query("UPDATE todo SET description = $1 WHERE todo_id = $2", [description, id]);

        res.json('todo is updated..');
    } catch (err) {
        console.log(err.message);
    }
})

//delete a todo
app.delete('/todos/:id', async(req,res) => {
    try {
        const {id} = req.params;
        const deletetodo = await pool.query("DELETE FROM todo WHERE todo_id = $1", [id]);

        res.json('todo is successfully deleted..!');
    } catch (err) {
        console.error(err.message);
    }
})


app.listen(5000, () => {
    console.log('server is running on port 5000');
});
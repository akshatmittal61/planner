import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import fs from 'fs';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
const __fileName = fileURLToPath(import.meta.url);
const __dirname = dirname(__fileName);
const app = express();
app.use(cors());
app.use(bodyParser.json());

let events = [];
let notes = [];
let tasks = [];
fs.readFile(path.join(__dirname, "events.json"), "utf8", (err, data) => {
    if (err) throw err;
    console.log(data);
    events = [...JSON.parse(data)];
})
fs.readFile(path.join(__dirname, "notes.json"), "utf8", (err, data) => {
    if (err) throw err;
    console.log(data);
    notes = [...JSON.parse(data)];
})
fs.readFile(path.join(__dirname, "tasks.json"), "utf8", (err, data) => {
    if (err) throw err;
    console.log(data);
    tasks = [...JSON.parse(data)];
})
const writeData = (arr, str) => {
    fs.writeFile(path.join(__dirname, `${str}.json`), JSON.stringify(arr), (err) => {
        if (err) throw err;
        console.log(`File Written to ${__dirname}/${str}.json`);
    })
}

app.get('/', (req, res) => {
    // res.sendFile(path.join(__dirname, 'index.html'));
    res.json(events, notes, tasks);
})
app.get('/api/events', (req, res) => {
    res.json(events);
})
app.get('/api/notes', (req, res) => {
    res.json(notes);
})
app.get('/api/notes/:id', (req, res) => {
    let id = +req.params.id;
    if (id < notes.length) {
        let note = notes[id];
        res.json(note);
    }
    else res.json({
        status: 404,
        message: "Note Not Found"
    })
})
app.get('/api/tasks', (req, res) => {
    res.json(tasks);
})

app.get('/events', (req, res) => {
    res.json(events);
})
app.post('/events', (req, res) => {
    let newEvent = req.body;
    events = [...events, newEvent];
    writeData(events, "events");
    res.json(newEvent);
})
app.patch('/events/:id', (req, res) => {
    let newEvent = req.body;
    let id = +req.params.id;
    events[id].title = newEvent.title;
    events[id].description = newEvent.description;
    events[id].type = newEvent.type;
    events[id].date = newEvent.date;
    writeData(events, "events");
    res.json(newEvent);
})
app.delete('/events/:id', (req, res) => {
    let id = +req.params.id;
    let newArray = [];
    newArray = events.filter((event, index) => index !== id);
    newArray.map((event, index) => {
        event.id = index;
    })
    events = [...newArray];
    writeData(events, "events");
    res.json(events);
})

app.get('/notes', (req, res) => {
    res.json(notes);
})
app.post('/notes', (req, res) => {
    let newNote = req.body;
    notes = [...notes, newNote];
    writeData(notes, "notes");
    res.json(newNote);
})
app.patch('/notes/:id', (req, res) => {
    let newNote = req.body;
    let id = +req.params.id;
    notes[id].title = newNote.title;
    notes[id].description = newNote.description;
    notes[id].linkURL = newNote.linkURL;
    notes[id].linkText = newNote.linkText;
    notes[id].color = newNote.color;
    writeData(notes, "notes");
    res.json(newNote);
})
app.delete('/notes/:id', (req, res) => {
    let id = +req.params.id;
    let newArray = [];
    newArray = notes.filter((note, index) => index !== id);
    newArray.map((note, index) => {
        note.id = index;
    })
    notes = [...newArray];
    writeData(notes, "notes");
    res.json(notes);
})

app.get('/tasks', (req, res) => {
    res.json(tasks);
})
app.post('/tasks', (req, res) => {
    let newTask = req.body;
    tasks = [...tasks, newTask];
    writeData(tasks, "tasks");
    res.json(newTask);
})
app.patch('/tasks/:id', (req, res) => {
    let newTask = req.body;
    let id = +req.params.id;
    tasks[id].title = newTask.title;
    tasks[id].description = newTask.description;
    tasks[id].date = newTask.date;
    tasks[id].time = newTask.time;
    tasks[id].done = newTask.done;
    writeData(tasks, "tasks");
    res.json(newTask);
})
app.delete('/tasks/:id', (req, res) => {
    let id = +req.params.id;
    let newArray = [];
    newArray = tasks.filter((task, index) => index !== id);
    newArray.map((task, index) => {
        task.id = index;
    })
    tasks = [...newArray];
    writeData(tasks, "tasks");
    res.json(tasks);
})


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started at port ${PORT}`))
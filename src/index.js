import express from "express";
import { sequelize } from "./database.js";
import { Task } from "./task.js";

const app = express()
const PORT = process.env.PORT || 3000

app.get("/tasks", async (req, res) => {
  try {
    const tasks = await Task.findAll({
      order: [['id', 'ASC']]
    })

    res.json(tasks)
  } catch(error) {
    console.error(`Ошибка получения задач: ${error}`)

    res.status(500).json({
      message: 'Не удалось получить список задач'
    })
  }
})

async function start() {
  try {
    await sequelize.authenticate()
    await sequelize.sync()

    if ((await Task.count() === 0)) {
     await Task.bulkCreate([
        {
          title: 'Купить продукты',
          completed: false
        },
        {
          title: 'Сделать домашнее задание',
          completed: false
        },
        {
          title: 'Позвонить врачу',
          completed: true
        },
        {
          title: 'Убрать квартиру',
          completed: false
        },
        {
          title: 'Протестировать автодеплой',
          completed: true
        }
      ]);
    }

    app.listen(PORT, () => {
      console.log(`Сервер запущен: http://localhost:${PORT}`)
    })

  } catch(error) {
    console.error(`Ошибка запуска приложения: ${error}`)

    await sequelize.close()
    process.exitCode = 1
  }
}

start()
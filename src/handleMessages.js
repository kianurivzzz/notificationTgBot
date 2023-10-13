const logAction = require("./logs/addTextLog");
const GoogleRequests = require("../src/googleSheets/googleSheetsRequests");
const Database = require("../src/db/dbQuerys");
const Crm = require("../src/crm/getLessons")
const extractIdFromUrl = require("../src/googleSheets/googleTableId");

class Message {
    constructor(chatId, text, from) {
        this.chatId = chatId;
        this.text = text;
        this.sheetId = "1XkRrNaeWAsI33ih1mcxKg0M4gYnkkWR0WG41fuKAFRE";
        this.from = from;
    }
    async handle(bot) {
        if (this.text === "/admin" && this.from === 'dsteshich' || this.from === "Nikita_Karasyov") {
            logAction(`запрос /admin от ${this.from}`);

            const startMessage = "Обработка запроса...";

            const options = {
                reply_markup: JSON.stringify({
                    keyboard: [
                        ["Обновить таблицу преподавателей", 'Записать уроки на сегодня в базу данных'],
                        ["Начать напоминание об уроках", 'Закончить']
                    ],
                    resize_keyboard: true,
                }),
            };

            this.sendKey(bot, startMessage, options);
        }
        const db = new Database()

        switch (this.text) {
            case "Обновить таблицу преподавателей":
                logAction(`запрос /updateTableTeacher от ${this.from}`);

                const googleRequests = new GoogleRequests("Преподаватели");
                const teachersTable = await googleRequests.pullTeacher();

                await db.deleteAllData('teachers') // удаляем все данные из таблицы преподов
                await db.insertDataTeacherTable(teachersTable)
                    .then((res) => {
                        logAction('Таблица успешно обновлена');
                        this.sendResponse(bot, "Таблица успешно обновлена")
                    })
                    .catch((error) => {
                        logAction(`Ошибка обновления таблицы преподавателей ${error}`);
                        this.sendResponse(bot, "Таблица успешно обновлена")
                    })
                    break;

            //  Надо дописать
            // case 'Записать уроки на сегодня в базу данных':
            //     logAction(`запрос /updateTableLessons от ${this.from}`);
            //
            //     const lessonsData = 0
            //
            //     await db.deleteAllData('today_lessons') // удаляем все данные из таблицы уроков
            //     await db.insertDataTeacherTable(lessonsData)
            //         .then((res) => {
            //             logAction('Таблица успешно обновлена');
            //             this.sendResponse(bot, "Таблица успешно обновлена")
            //         })
            //         .catch((error) => {
            //             logAction(`Ошибка обновления таблицы преподавателей ${error}`);
            //             this.sendResponse(bot, "Таблица успешно обновлена")
            //         })
            //     break;

            case "Закончить":
                this.hideOptions(bot, "Работа закончена \n\n Нажми для повторного запуска – /admin");
                break;
        }

    }

    sendResponse(bot, response) {
        bot.sendMessage(this.chatId, response);

        logAction(`Бот отравил сообщение: '${response}' ${this.from} `);
    }

    sendKey(bot, message, options) {
        bot.sendMessage(this.chatId, message, options);
    }

    hideOptions(bot, message) {
        const hideOptions = {
            reply_markup: JSON.stringify({
                remove_keyboard: true,
            }),
        };

        bot.sendMessage(this.chatId, message, hideOptions);
    }
}

module.exports = Message;
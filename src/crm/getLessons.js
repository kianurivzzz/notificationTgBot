const dotenv = require('dotenv').config()
const getAllLessonsJson = async (url = '', page = 0) => {
    // Формируем запрос
    const nowDate = new Date();
    const response = await fetch(url, {
        method: 'POST',
        // Заголовок запроса
        headers: {
            'Content-Type': 'application/json'
        },
        // Тело
        body: JSON.stringify({
            "offset": page,
            "access_token": process.env.CRM_TOKEN,
            "filter": {
                "course": {
                    "id": null,
                    "subjects": [],
                    "teachers_lessons": [],
                    "date_start": {
                        "symbol": "=",
                        "date": null
                    },
                    "date_time_to_end": {
                        "symbol": "=",
                        "date": null
                    },
                    "upcoming": false,
                    "is_incl": false,
                    "interval": false,
                    "interval_date": {
                        "from": "",
                        "before": ""
                    }
                },
                "lesson": {
                    "teachers": [342],
                    "upcoming": false,
                    "date_start": {
                        "symbol": ">=",
                        "date": `${nowDate.getFullYear()}-${nowDate.getMonth() + 1}-0${nowDate.getDate()}T12:50:00.000Z`
                    },
                    "date_end": {
                        "symbol": "<=",
                        "date": `${nowDate.getFullYear()}-${nowDate.getMonth() + 1}-0${nowDate.getDate()}T12:50:00.000Z`
                    },
                    "lesson_number": null,
                    "lessons_type": [],
                    "exclude": true
                },
                "order": {
                    "managers": [],
                    "products_managers": [],
                    "onlyCheckedProductsManagers": false,
                    "ignore_franchises": [],
                    "ignore_category_products": [],
                    "order_id": "",
                    "set_id": "",
                    "departaments": [],
                    "partners": [],
                    "franchises": [],
                    "teachers": [],
                    "category_products": [],
                    "products": [],
                    "remanufactured": false,
                    "query_mailing_id": null,
                    "workshops": [],
                    "design_studios": [],
                    "currencies": [],
                    "upcoming": false,
                    "created_at": {},
                    "show_flag_teacher": false,
                    "is_teacher_sale": false,
                    "expectation_start": "",
                    "expectation_end": "",
                    "teachers_lessons": [],
                    "methodist_group": [],
                    "ignoreGroupMethodist": false,
                    "IgnoreDepartments": false,
                    "ignoreTeachers": false
                },
                "customer": {
                    "from_id": "",
                    "name": "",
                    "when_write": null,
                    "without_customers_groups": false,
                    "customers_groups": [],
                    "customer_id": "",
                    "external_from_id": "",
                    "ignore_utm_source": false,
                    "utm_source": "",
                    "utm_medium": "",
                    "utm_content": "",
                    "utm_campaign": "",
                    "utm_term": "",
                    "orders_count": null,
                    "tags": "",
                    "created_at": {
                        "date_finish": "",
                        "date_start": ""
                    },
                    "date_call": {
                        "date_start": "",
                        "date_finish": ""
                    }
                },
                "customer_fields": [],
                "order_fields": [],
                "delivery_fields": [],
                "date_change_order_fields": [],
                "products_created": {
                    "start_date": null,
                    "finish_date": null
                },
                "query_mailing_id": 0
            }
        })
    });
    return response.json();
}
//
// const getAllLessons = async () => {
//     getAllLessonsJson(process.env.CRM_DATA_URL, 0).then((allLessonsJson) => {
//         let allLessons = []
//         let lessons = allLessonsJson["lessons"]
//         console.log(lessons)
//         allLessons.concat(lessons)
//         return allLessons
//     })
// }

getAllLessonsJson(process.env.CRM_DATA_URL, 0).then((allLessonsJson) => {

    console.log(allLessonsJson)
})
// module.exports = getAllLessons();
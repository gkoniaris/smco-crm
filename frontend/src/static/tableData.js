const questionTable = {
    actions: {
        view: {
            to: 'question'
        }
    },
    fields: [
        {
            name: "id",
            property: "id",
            title: "ΤΤΕ"
        },
        {
            name: "question",
            property: "question",
            title: "Ερώτηση"
        },
        {
            name: "status",
            property: "status",
            title: "Κατάσταση",
            replace: {
                open: "Ανοιχτή",
                freezed: "Σε αναμονή",
                closed: "Κλειστή"
            }
        },
        {
            name: "askedDate",
            property: "askedDate",
            title: "Ημερομηνία",
            sort: "askedDate",
            format: (date) => {
                return date.slice(0, 10)
            }
        },
        {
            name: "firstName",
            property: "client.firstName",
            title: "Όνομα"
        },
        {
            name: "lastName",
            property: "client.lastName",
            title: "Επώνυμο"
        }
    ]
}

const deviceTable = {
    actions: {
        view: {
            to: 'device'
        }
    },
    fields: [
        {
            name: "id",
            property: "id",
            title: "TTΣ"
        },
        {
            name: "type",
            property: "type",
            title: "Είδος συσκευής"
        },
        {
            name: "model",
            property: "model",
            title: "Μοντέλο"
        },
        {
            name: "status",
            property: "status",
            title: "Κατάσταση",
            replace: {
                open: "Ανοιχτή",
                freezed: "Σε αναμονή",
                closed: "Κλειστή"
            }
        },
        {
            name: "date",
            property: "date",
            title: "Ημερομηνία παραλαβής",
            sort: "date",
            format: (date) => {
                return date.slice(0, 10)
            }
        },
        {
            name: "firstName",
            property: "client.firstName",
            title: "Όνομα"
        },
        {
            name: "lastName",
            property: "client.lastName",
            title: "Επώνυμο"
        }
    ]
}

const userTable = {
    actions: {
        view: {
            to: 'clientProfile'
        }
    },
    fields: [{
            name: "id",
            property: "id",
            title: "ΤΤΠ",
            sort: "id"
        },
        {
            name: "firstName",
            property: "firstName",
            title: "Όνομα",
            sort: "firstName"
        },
        {
            name: "lastName",
            property: "lastName",
            title: "Επώνυμο",
            sort: "lastName"
        },
        {
            name: "address",
            property: "addresses[0].address",
            title: "Διεύθυνση"
        },
        {
            name: "phone",
            property: "phones[0].phone",
            title: "Τηλέφωνο"
        }
    ]
}

const usefulPhoneTable = {
    actions: null,
    fields: [
        {
            name: "title",
            property: "title",
            title: "Ιδιωκτήτης τηλεφώνου"
        },
        {
            name: "phone",
            property: "phone",
            title: "Τηλέφωνο"
        }
    ]
}

export default {
    userTable,
    questionTable,
    deviceTable,
    usefulPhoneTable
}
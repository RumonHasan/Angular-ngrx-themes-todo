"use strict";
exports.__esModule = true;
exports.initialStates = exports.getRandomIdNumber = void 0;
// function to grab id
function getRandomIdNumber(idlen) {
    var result = '';
    for (var i = 0; i < idlen; i++) {
        result += Math.floor(Math.random() * 6);
    }
    return result;
}
exports.getRandomIdNumber = getRandomIdNumber;
var taskItems = [
    {
        id: parseInt(getRandomIdNumber(6)),
        title: 'Become a Scientist',
        description: 'Task description is gonna be huge',
        category: 'Science',
        inprogress: false,
        comments: [],
        archive: false,
        createdAt: new Date()
    },
    {
        id: parseInt(getRandomIdNumber(6)),
        title: 'This is your first task',
        description: 'Task description is gonna be huge',
        category: 'Math',
        inprogress: false,
        comments: [],
        archive: false,
        createdAt: new Date()
    },
    {
        id: parseInt(getRandomIdNumber(6)),
        title: 'This is your third task',
        description: 'Hey man',
        category: 'Horticulture',
        inprogress: false,
        comments: [],
        archive: false,
        createdAt: new Date()
    },
    {
        id: parseInt(getRandomIdNumber(6)),
        title: 'This is your last task',
        description: 'Task Task Task Task',
        category: 'Climate',
        inprogress: false,
        comments: [],
        archive: false,
        createdAt: new Date()
    }
];
// main initial states
exports.initialStates = {
    tasks: taskItems,
    editId: '',
    commentId: '',
    archiveState: false,
    categories: ['Science', 'Math', 'Climate', 'Horticulture'],
    filteredTasks: [],
    filterState: false,
    themeState: false
};

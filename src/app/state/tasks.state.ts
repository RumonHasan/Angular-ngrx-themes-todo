import { Task,Comment } from "../task/task";

// function to grab id
export function getRandomIdNumber(idlen: Number){
    let result = '';
    for(let i = 0; i < idlen; i++){
      result += Math.floor(Math.random() * 6);
    }
    return result;
  }
const taskItems: Task[] = [
    {
        id:parseInt(getRandomIdNumber(6)),
        title:'Become a Scientist',
        description:'Task description is gonna be huge',
        category:'Science',
        inprogress: false,
        comments:[],
        archive: false,
        createdAt: new Date()
      },
      {
        id:parseInt(getRandomIdNumber(6)),
        title:'This is your first task',
        description:'Task description is gonna be huge',
        category:'Math',
        inprogress: false,
        comments: [],
        archive: false,
        createdAt: new Date()
      },
      {
        id:parseInt(getRandomIdNumber(6)),
        title:'This is your third task',
        description:'Hey man',
        category:'Horticulture',
        inprogress: false,
        comments: [],
        archive: false,
        createdAt: new Date()
      },
      {
        id:parseInt(getRandomIdNumber(6)),
        title:'This is your last task',
        description:'Task Task Task Task',
        category:'Climate',
        inprogress: false,
        comments: [],
        archive: false,
        createdAt: new Date()
      } 
]

// main initial states
export const initialStates = {
    tasks: taskItems,
    editId: '',
    commentId: '',
    archiveState: false,
    categories: ['Science', 'Math', 'Climate', 'Horticulture'],
    filteredTasks: [],
    filterState: false,
    themeState: false,
    categoryTasks: {}
}


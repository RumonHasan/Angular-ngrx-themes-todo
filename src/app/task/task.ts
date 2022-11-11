export interface Comment{
  id?: any,
  commentDetails: string;
}
export interface Task {
    id?: any;
    title: string;
    description: string;
    category:String;
    inprogress: boolean;
    comments: Comment[];
    archive: boolean;
    createdAt: Date;
  }
 
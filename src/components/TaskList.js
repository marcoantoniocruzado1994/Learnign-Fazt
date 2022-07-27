import { useSelector, useDispatch } from "react-redux";
import { deleteTask } from "../feature/tasks/taskSlice";
import { Link } from "react-router-dom";

const TaskList = () => {
  const tasks = useSelector((state) => state.tasks);

  const dispatch = useDispatch();

  const handleDelete = (id) => {
    dispatch(deleteTask(id));
  };

  return (
    <div className="w-4/6 ">
      <header className="flex justify-between items-center py-4">
        <h1 className="font-bold ">Tasks {tasks.length}</h1>
        <Link className="bg-indigo-600 px-2 py-1 rounded-sm text-sm" to="/add">
          Add Task
        </Link>
      </header>

      <div className="grid grid-cols-3 gap-3">
        {tasks.map((task) => (
          <div key={task.id} className="bg-neutral-800 p-4 rounded-md">
            <header className="flex justify-between">
              <h2>{task.title}</h2>
              <div className="flex gap-x-2">
                <Link className="bg-green-500 px-2 py-1 text-xs rounded-md " to={`/edit/${task.id}`}>Edit</Link>
                <button className="bg-red-500 px-2 py-1 text-xs rounded-md " onClick={() => handleDelete(task.id)}>Delete</button>
              </div>
            </header>
            <p>{task.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskList;

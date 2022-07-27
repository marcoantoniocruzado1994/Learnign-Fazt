import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTask, updateTask } from "../feature/tasks/taskSlice";
import { v4 as uuid } from "uuid";
import { useNavigate, useParams } from "react-router-dom";
const TaskForm = () => {
  //use dispatch to dispatch y el navigate para redirigir
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const tasks = useSelector((state) => state.tasks);
  const params = useParams();
  // hook datos iniciales
  const [task, setTask] = useState({
    title: "",
    description: "",
  });
  //hook para el cambio de estado
  const handleChange = (e) => {
    setTask({
      ...task,
      [e.target.name]: e.target.value,
    });
  };
  //hook para el envio de datos
  const handleSubmit = (e) => {
    e.preventDefault();
    if (params.id) {
      dispatch(updateTask(task));
    } else {
      dispatch(
        addTask({
          id: uuid(),
          ...task,
        })
      );
    }
    navigate("/");
  };

  useEffect(() => {
    if (params.id) {
      const task = tasks.find((task) => task.id === params.id);
      setTask(task);
    }
  }, [params.id, tasks]);

  return (
    <form className="bg-zinc-800 max-w-sm p-4 rounded-md" onSubmit={handleSubmit}>
      <label className="block text-sm font-bold mb-1" htmlFor="title">
        Titulo :{" "}
      </label>
      <input
        className="w-full p-2 rounded-md bg-zinc-600 mb-2"
        type="text"
        name="title"
        required
        value={task.title}
        onChange={handleChange}
        placeholder="Enter a task..."
      />
      <label className="block text-sm font-bold mb-2" htmlFor="description">
        Descripcion :{" "}
      </label>
      <textarea
        name="description"
        className="w-full p-2 rounded-md bg-zinc-600 mb-2"
        required
        value={task.description}
        placeholder="Enter a description..."
        onChange={handleChange}
      ></textarea>
      <button className="bg-indigo-600 px-2 py-1">Add Task</button>
    </form>
  );
};

export default TaskForm;

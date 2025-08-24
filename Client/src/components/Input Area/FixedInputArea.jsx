import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useNotes } from "../../Context/NotesContext";
import "../../styles/Input Area/fixedInputArea.css";

const FixedInputArea = () => {
    const {addNote} = useNotes();
    const navigate = useNavigate();
    const {visibility} = useParams();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    addNote(data, visibility);
    navigate("/");
  };

  return (
    <div id="fixed-input-area-container">
        <h1>New Note</h1>
      <form onSubmit={handleSubmit(onSubmit)} id="fixed-input-form">
        <input
          {...register("title", { required: true })}
          className={errors.title ? "errors" : null}
          id="fixed-note-title"
          placeholder="Title"
        />
        <textarea
          {...register("description", { required: true })}
          className={`${errors.description ? "errors" : null}`}
          id="fixed-note-desc"
          placeholder="Take a note..."
        />
        <button
            id="fixed-add-button"
          className={`button-style`}
        >
          Add
        </button>
      </form>
    </div>
  );
};

export default FixedInputArea;

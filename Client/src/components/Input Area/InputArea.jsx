import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { BiExpandAlt } from "react-icons/bi";
import { BiCollapseAlt } from "react-icons/bi";
import "../../styles/Input Area/inputArea.css";

const InputArea = ({addNote}) => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const [collapsedForm, setCollapsedForm] = useState(true);
  const [expandedForm, setExpandedForm] = useState(false);

  const onSubmit = (data) => {
    console.log("submitted note: ", data);
    if (data.title !== "" && data.description !== "") {
      addNote(data);
    }
    reset();
  };
  
  //Fix a bug that shows the scroll bar on 1st expansion
  useEffect(() => {
    const form = document.querySelector("form.input-area");
    const textArea = document.getElementById("note-desc");
    form.addEventListener("transitionstart", () => {
      textArea.style.overflow = "hidden";
    });
    form.addEventListener("transitionend", () => {
      textArea.style.overflow = "auto";
    });
  }, []);
  return (
    <div
      className={`form-container ${(expandedForm || !collapsedForm) && "expanded-margin"}`}
      onFocus={() => setCollapsedForm(false)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) {
          setCollapsedForm(true);
          setExpandedForm(false);
        }
      }}
      tabIndex={"-1"}
    >
      <form
        className={`input-area ${collapsedForm ? "collapsed" : null} ${
          expandedForm ? "expanded-form" : null
        }`}
        onSubmit={handleSubmit(onSubmit)}
      >
        {!collapsedForm && (
          <div className={`title reveal-title-field`}>
            <input
              {...register("title", { required: true })}
              className={errors.title ? "errors" : null}
              id="note-title"
              placeholder="Title"
            />
          </div>
        )}
        <textarea
          {...register("description", { required: true })}
          className={`${errors.description ? "errors" : null}
          ${expandedForm ? "expanded-textarea" : null}
          ${collapsedForm ? "collapsed-textarea" : null}`.trim()}
          id="note-desc"
          placeholder="Take a note..."
        />
        <button
          className={`add-button ${collapsedForm ? "hide-button" : null} ${
            expandedForm ? "expanded-addButton" : null
          }`}
        >
          +
        </button>
      </form>
      <div id="expand-collapse-icons">
        <span>
          {expandedForm ? (
            <BiCollapseAlt
              onClick={() => setExpandedForm(false)}
              className="icon"
            />
          ) : (
            <BiExpandAlt
              onClick={() => setExpandedForm(true)}
              className={`icon ${
                collapsedForm ? "hide-icons" : "display-icons"
              }`}
            />
          )}
        </span>
      </div>
    </div>
  );
};

export default InputArea;

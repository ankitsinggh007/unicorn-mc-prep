import { FileView } from "../App";

export default function FolderView({
  name,
  child,
  id,
  expand,
  onExpand,
  highlight,
  onHighlight,
}) {
  return (
    <div style={{ marginLeft: "1rem" }}>
      <button
        aria-expanded={expand.includes(id)}
        aria-controls={id}
        onClick={() => onExpand(id)}
      >
        {expand.includes(id) ? "📂 " : "📁"} {name}
      </button>
      <span>
        {expand.includes(id) && (
          <div id={id} role="group">
            {child.length === 0 && <p>folder is empty</p>}
            {child.length > 0 &&
              child.map((obj) => {
                // console.log(obj, "childProp");
                return obj.type === "folder" ? (
                  <FolderView
                    child={obj?.children}
                    key={obj?.id}
                    expand={expand}
                    id={obj?.id}
                    name={obj?.name}
                    onExpand={onExpand}
                    onHighlight={onHighlight}
                    highlight={highlight}
                  />
                ) : (
                  <FileView
                    key={obj?.id}
                    id={obj?.id}
                    name={obj.name}
                    highlight={highlight}
                    onHighlight={onHighlight}
                  />
                );
              })}
          </div>
        )}{" "}
      </span>
    </div>
  );
}

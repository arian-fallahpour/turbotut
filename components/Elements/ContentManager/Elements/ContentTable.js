import React from "react";
import ContentManager, { format } from "../ContentManager";
import Latex from "react-latex-next";
import { join } from "@/utils/helper";

const ContentTable = ({ style, content, rows, gridTemplateColumns }) => {
  return (
    <table className="table" style={style}>
      <tbody className="table-content">
        {rows.map((row, i) => (
          <tr
            key={i}
            className={join("table-row", !!row.header ? "table-header" : null)}
            style={{ ...row.style, gridTemplateColumns }}
          >
            {row.cells.map((col, j) => (
              <td key={j} className={"table-cell"} style={col.style}>
                {!col.content && <span>&nbsp;</span>}
                {!!col.content && <ContentManager {...col} />}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
      {content && (
        <tbody style={{ display: "grid", justifyContent: "center" }}>
          <tr>
            <td>
              <p>
                <Latex>{format(content)}</Latex>
              </p>
            </td>
          </tr>
        </tbody>
      )}
    </table>
  );
};

export default ContentTable;

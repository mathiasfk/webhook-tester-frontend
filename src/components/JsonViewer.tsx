import React from "react";

interface JsonViewerProps {
  json: string;
  onFieldClick?: (path: string, value: any) => void;
}

const JsonViewer: React.FC<JsonViewerProps> = ({ json, onFieldClick }) => {
  const renderJson = (data: any, path: string = "") => {
    if (typeof data === "string") {
      return <span className="text-green-500">"{data}"</span>;
    } else if (typeof data === "number") {
      return <span className="text-blue-500">{data}</span>;
    } else if (Array.isArray(data)) {
      return (
        <span>
          [<ul className="ml-4">
            {data.map((item, index) => (
              <li key={index}>
                {renderJson(item, `${path}[${index}]`)}
                {index < data.length - 1 ? ',' : ''}
              </li>
            ))}
          </ul>]
        </span>
      );
    } else if (typeof data === "object") {
      return (
        <span>
          {"{"}<ul className="ml-4">
            {Object.entries(data).map(([key, value], index, array) => (
              <li key={key}>
                <span
                  className="cursor-pointer hover:font-bold hover:underline"
                  onClick={() => onFieldClick && onFieldClick(`body${path}.${key}`, value)}
                >
                  {key}:
                </span>{" "}
                {renderJson(value, `${path}.${key}`)}
                {index < array.length - 1 ? ',' : ''}
              </li>
            ))}
          </ul>{"}"}
        </span>
      );
    }
    return <span>{String(data)}</span>;
  };

  try {
    const jsonData = JSON.parse(json);
    return <div>{renderJson(jsonData)}</div>;
  } catch (error) {
    return <pre>{json}</pre>;
  }
};

export default JsonViewer;
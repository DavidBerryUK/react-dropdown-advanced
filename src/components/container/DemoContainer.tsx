import React from "react";
import "./styles/Styles.scss";

interface IProperties {
  title: string;
  version: string;
  description: string;
  children: React.ReactNode;
  className: string;
}

const DemoContainer: React.FC<IProperties> = ({ version, title, description, children, className }) => {
  className = `ui-container ${className}`;
  return (
    <div className={className}>
      <div className="header">
        <div className="version">{version}</div>
        <div className="title">{title}</div>
      </div>
      <div className="description">{description}</div>
      <div className="demo">{children}</div>
    </div>
  );
};

export default DemoContainer;

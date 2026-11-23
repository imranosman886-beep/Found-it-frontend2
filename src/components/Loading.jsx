
import { LoaderCircle } from "lucide-react";

function Loading({ message = "Loading..." }) {
  return (
    <div className="loading-component">
      <LoaderCircle className="loading-spinner" size={28} />
      <p>{message}</p>
    </div>
  );
}

export default Loading;

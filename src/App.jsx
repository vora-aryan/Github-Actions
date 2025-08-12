/* eslint-disable no-unused-vars */
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useEffect, useState } from "react";

// import { useEffect, useState } from "react";

const App = () => {
  const [page, setPage] = useState(1);
  const queryClient = useQueryClient();
  const { data, isLoading, refetch, isFetching } = useQuery({
    queryKey: ["test", page],
    queryFn: () => fetchTodos(page),
    staleTime: 1000 * 30,
    placeholderData: keepPreviousData,
  });
  const [url, setUrl] = useState("");
  const [type, setType] = useState("video");

  const handleDownload = async () => {
    if (!url) return alert("Enter a YouTube URL");
    window.open(
      `http://localhost:4000/download?url=${encodeURIComponent(
        url
      )}&type=${type}`
    );
  };

  //download youtube video fn
  // const downloadVideo = () => {
  //   fetch("http://localhost:4000/download?url=" + encodeURIComponent(videoUrl))
  //     .then((res) => res.blob())
  //     .then((blob) => {
  //       const a = document.createElement("a");
  //       a.href = URL.createObjectURL(blob);
  //       a.download = "video.file";
  //       a.click();
  //     })
  //     .catch(console.error);
  // };

  const mutation = useMutation({
    mutationFn: createTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["test"] });
    },
  });

  return (
    <div style={{ margin: "2rem" }} className="">
      <h1>Tanstack Query</h1>

      <button onClick={() => refetch()}>Click</button>
      <button onClick={() => mutation.mutate()}>
        {mutation.isPending ? "Loading..." : "Create Todo"}
      </button>

      {/* {isLoading || isFetching ? (
        "Loading..."
      ) : (
      )} */}
      <ul>
        {data?.map((todo) => (
          <li key={todo.id}>{todo.title}</li>
        ))}
      </ul>
      <div style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
        <button onClick={() => setPage(page - 1)} disabled={page === 1}>
          Prev
        </button>
        <span>{page}</span>
        <button onClick={() => setPage(page + 1)} disabled={page === 5}>
          Next
        </button>
      </div>
      <div>
        <h1>YouTube Video/Audio Downloader</h1>
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Paste YouTube URL"
          style={{ width: "300px" }}
        />
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="video">Video</option>
          <option value="audio">Audio (MP3)</option>
        </select>
        <button onClick={handleDownload}>Download</button>
      </div>
    </div>
  );
};

const createTodo = async () => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const res = await fetch("https://jsonplaceholder.typicode.com/todos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userId: 1,
      title: "New Todo " + Math.random().toFixed(3),
      completed: false,
    }),
  });
  return res.json();
};

const fetchTodos = async (page) => {
  console.log("fetch todos called");

  await new Promise((resolve) => setTimeout(resolve, 1000));
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/todos?_limit=5&_page=${page}`
  );
  let data = await res.json();
  return data;
};
export default App;

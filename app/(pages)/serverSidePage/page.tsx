// "use client";
import React from "react";

const fetchData = async () => {
  try {
    const response = await fetch(
      "http://localhost:3000/api/server/getStaticServerData",
      { cache: "force-cache" } // this thing here makes it <ISR></ISR>
    );
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};

export default async function Page({ params }: any) {
  //   const [state, setState] = React.useState(1);
  const data = await fetchData();

  return (
    <div>
      serverSidePage" "{typeof window}" " {JSON.stringify(data)}
    </div>
  );
}

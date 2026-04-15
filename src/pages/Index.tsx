import { useEffect } from "react";
import Quiz from "@/components/Quiz";
import func2url from "../../backend/func2url.json";

const Index = () => {
  useEffect(() => {
    let visitorId = localStorage.getItem("visitor_id");
    if (!visitorId) {
      visitorId = crypto.randomUUID();
      localStorage.setItem("visitor_id", visitorId);
    }
    fetch(func2url["track-visit"], {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ visitor_id: visitorId }),
    }).catch(() => {});
  }, []);

  return <Quiz />;
};

export default Index;

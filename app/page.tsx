import React, { useState, useEffect } from "react";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Download, Loader2 } from "lucide-react";

export default function ImageGenerator() {
  const [prompt, setPrompt] = useState("");
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const storedHistory = localStorage.getItem("hidream_history");
    if (storedHistory) {
      setHistory(JSON.parse(storedHistory));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("hidream_history", JSON.stringify(history));
  }, [history]);

  const generateImage = async () => {
    if (!prompt.trim()) {
      setError("请输入提示词。");
      return;
    }

    setLoading(true);
    setError(null);
    setImageUrl(null);

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });
      const data = await response.json();
      if (data.image_url) {
        setImageUrl(data.image_url);
        setHistory([{ prompt, image_url: data.image_url }, ...history]);
      } else {
        setError("生成失败，请检查提示词或稍后再试。");
      }
    } catch (err) {
      setError("请求出错，请稍后再试。");
    } finally {
      setLoading(false);
    }
  };

  const downloadImage = (url) => {
    const link = document.createElement("a");
    link.href = url;
    link.download = "generated_image.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-6">HiDream 文生图生成器</h1>
      <div className="w-full max-w-xl">
        <Input
          placeholder="请输入你的提示词..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="mb-4"
        />
        <Button onClick={generateImage} disabled={loading}>
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />生成中...
            </>
          ) : (
            "生成图片"
          )}
        </Button>
        {error && <p className="text-red-500 mt-4">{error}</p>}

        {imageUrl && (
          <Card className="mt-6">
            <CardContent className="flex flex-col items-center">
              <img src={imageUrl} alt="生成图像" className="rounded max-w-full mb-2" />
              <Button variant="outline" onClick={() => downloadImage(imageUrl)}>
                <Download className="mr-2 h-4 w-4" />下载图片
              </Button>
            </CardContent>
          </Card>
        )}

        {history.length > 0 && (
          <div className="mt-10">
            <h2 className="text-xl font-semibold mb-4">历史记录</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {history.map((item, index) => (
                <Card key={index}>
                  <CardContent className="p-4">
                    <p className="mb-2 text-sm text-gray-600">提示词: {item.prompt}</p>
                    <img
                      src={item.image_url}
                      alt={`history-${index}`}
                      className="rounded mb-2"
                    />
                    <Button variant="outline" onClick={() => downloadImage(item.image_url)}>
                      <Download className="mr-2 h-4 w-4" />下载
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

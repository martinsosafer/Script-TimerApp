"use client";

import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

// Importing UI components
import { Button } from "@voiceai/ui";
import {
  IconChevronUpDown as ChevronDown,
  IconPlay as Play,
} from "@voiceai/ui/@/components/ui/icons";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@voiceai/ui/@/components/ui/select";

// Mock data for voices and audio samples
const voices = [
  "Sara",
  "Maya",
  "Scott",
  "Carter",
  "Bria",
  "Natalie",
  "Jack",
  "Ryan",
];
const tasks = [
  "Value Proposition Story",
  "Podcast Introduction",
  "Write a Video Sales Letter",
];
const languages = [
  { code: "us", name: "English (US)" },
  { code: "es", name: "Spanish" },
  { code: "fr", name: "French" },
  { code: "zh-CN", name: "Chinese (Mandarin)" },
];
const audioSamples = {
  "Value Proposition Story": {
    Bria: {
      us: "https://8ipgp5xevb8hkgbh.public.blob.vercel-storage.com/MockupVoices/BriaUs1.mp3",
      es: "https://8ipgp5xevb8hkgbh.public.blob.vercel-storage.com/MockUpVoices/BriaEs1-rb4ItHdARcxSYIvKT5GKhzt9SzCo3s.mp3",
      fr: "https://8ipgp5xevb8hkgbh.public.blob.vercel-storage.com/MockUpVoices/BriaFr1-UTIXhNJgSDtpRXswOgCe6inI3F8mJa.mp3",
      "zh-CN":
        "https://8ipgp5xevb8hkgbh.public.blob.vercel-storage.com/MockUpVoices/BriaCh1-3kl4PLTJrKq6uW7FMV0Uk3RsDyA1Qi.mp3",
    },
    Carter: {
      us: "https://8ipgp5xevb8hkgbh.public.blob.vercel-storage.com/MockUpVoices/CarterUs1-VpEYfSjXbB27uo9EUGHvBI5eXKcNC0.mp3",
      es: "https://8ipgp5xevb8hkgbh.public.blob.vercel-storage.com/MockUpVoices/CarterEs1-SBt0O6AXVflN2xOgpWMifT5y3FwldC.mp3",
      fr: "https://8ipgp5xevb8hkgbh.public.blob.vercel-storage.com/MockUpVoices/CarterFr1-FZgBIspTEN5GEfjAQALfLxoVdHdbyB.mp3",
      "zh-CN":
        "https://8ipgp5xevb8hkgbh.public.blob.vercel-storage.com/MockUpVoices/CarterCh1-XqqpDPsGbPVbLghCqJEtsavdqTz7I6.mp3",
    },
    Jack: {
      us: "https://8ipgp5xevb8hkgbh.public.blob.vercel-storage.com/MockUpVoices/JackUs1-OSdg22cP5ktGEc4TkTpiQ70rOH4K26.mp3",
      es: "https://8ipgp5xevb8hkgbh.public.blob.vercel-storage.com/MockUpVoices/JackEs1-VNaDLqLM13Vza90EXtJd8I0L3dTttu.mp3",
      fr: "https://8ipgp5xevb8hkgbh.public.blob.vercel-storage.com/MockUpVoices/JackFr1-WO36ZHMbFe3aKAg6bCRFpPS1B1VFqw.mp3",
      "zh-CN":
        "https://8ipgp5xevb8hkgbh.public.blob.vercel-storage.com/MockUpVoices/JackCh1-qHNAEVtuV5M3ZhVUvAc840QML0IhrD.mp3",
    },
    Maya: {
      us: "https://8ipgp5xevb8hkgbh.public.blob.vercel-storage.com/MockUpVoices/MayaUs1-Kmx12NsLD2d8QYPvsJRyRwjKlSHafQ.mp3",
      es: "https://8ipgp5xevb8hkgbh.public.blob.vercel-storage.com/MockUpVoices/MayaEs1-k94ktG1KZwCqi2gTD1laJq4SKozw6b.mp3",
      fr: "https://8ipgp5xevb8hkgbh.public.blob.vercel-storage.com/MockUpVoices/MayaFr1-CgCkBcRMyYnjiLZ9v5xKYGAWh62qVy.mp3",
      "zh-CN":
        "https://8ipgp5xevb8hkgbh.public.blob.vercel-storage.com/MockUpVoices/MayaCh1-CDVNf5sVPn98Y5zDvKlH9fe89cfYHX.mp3",
    },
    Natalie: {
      us: "https://8ipgp5xevb8hkgbh.public.blob.vercel-storage.com/MockUpVoices/NatalieUs1-rfe9exoJDnyxAcEjIlpmvTos0ltmYT.mp3",
      es: "https://8ipgp5xevb8hkgbh.public.blob.vercel-storage.com/MockUpVoices/NatalieEs1-GBJ3wxXUfAgdMqHaJDg1Bs352oVIz4.mp3",
      fr: "https://8ipgp5xevb8hkgbh.public.blob.vercel-storage.com/MockUpVoices/NatalieFr1-TQpJZdCYtRXpo8iIwDxsfTeYwKyF13.mp3",
      "zh-CN":
        "https://8ipgp5xevb8hkgbh.public.blob.vercel-storage.com/MockUpVoices/NatalieCh1-RJ9sWbAGVoYcrDsuYXXP6nAuUFcRLG.mp3",
    },
    Ryan: {
      us: "https://8ipgp5xevb8hkgbh.public.blob.vercel-storage.com/MockUpVoices/RyanUs1-9WQIBUi9MPfC1DWSlSp8NQKlT55lmw.mp3",
      es: "https://8ipgp5xevb8hkgbh.public.blob.vercel-storage.com/MockUpVoices/RyanEs1-Wba1gUPGDRIz4AbjRpqOMJlg7D3TFf.mp3",
      fr: "https://8ipgp5xevb8hkgbh.public.blob.vercel-storage.com/MockUpVoices/RyanFr1-KjRsPAMJzrs8AlsfUGt9jyB7J9ovL5.mp3",
      "zh-CN":
        "https://8ipgp5xevb8hkgbh.public.blob.vercel-storage.com/MockUpVoices/RyanCh1-tIjtt5SXBEswTFdNsNkMKsNro3KOpb.mp3",
    },
    Sara: {
      us: "https://8ipgp5xevb8hkgbh.public.blob.vercel-storage.com/MockUpVoices/SaraUs1-A8nIXJwmE0g3ZUSrY3YbRikAftPfqt.mp3",
      es: "https://8ipgp5xevb8hkgbh.public.blob.vercel-storage.com/MockUpVoices/SaraEs1-ICNnFNCiDkATHDCSPKGFJYOh7fbJdt.mp3",
      fr: "https://8ipgp5xevb8hkgbh.public.blob.vercel-storage.com/MockUpVoices/SaraFr1-ftQEdtlEKeqZj6kEXEiq79RQtsQgCo.mp3",
      "zh-CN":
        "https://8ipgp5xevb8hkgbh.public.blob.vercel-storage.com/MockUpVoices/SaraCh1-401mv69CTsvMsYPqfo8zHzfuZivaJa.mp3",
    },
    Scott: {
      us: "https://8ipgp5xevb8hkgbh.public.blob.vercel-storage.com/MockUpVoices/ScottUs1-414nxaPN7f70VLjwx8tremy2yY10L0.mp3",
      es: "https://8ipgp5xevb8hkgbh.public.blob.vercel-storage.com/MockUpVoices/ScottEs1-DORH0SmbN7xUwRDngIPKGBtjfN6EJk.mp3",
      fr: "https://8ipgp5xevb8hkgbh.public.blob.vercel-storage.com/MockUpVoices/ScottFr1-5JWXhWVC42SG5lABLMDL0VyjoBq6Hw.mp3",
      "zh-CN":
        "https://8ipgp5xevb8hkgbh.public.blob.vercel-storage.com/MockUpVoices/ScottCh1-XxmsJezTLojaHTse7JL3ICxbnTHE9t.mp3",
    },
  },
  "Podcast Introduction": {
    Bria: {
      us: "https://8ipgp5xevb8hkgbh.public.blob.vercel-storage.com/MockupVoices/BriaUs2.mp3",
      es: "https://8ipgp5xevb8hkgbh.public.blob.vercel-storage.com/MockUpVoices/BriaEs2-W3ZPMHlMWFBCLqIjV2iwYRwVhvhZVu.mp3",
      fr: "https://8ipgp5xevb8hkgbh.public.blob.vercel-storage.com/MockUpVoices/BriaFr2-NQ2WMytNFUZ78F80GiWkku9LdagHgw.mp3",
      "zh-CN":
        "https://8ipgp5xevb8hkgbh.public.blob.vercel-storage.com/MockUpVoices/BriaCh2-8orNHR6AQKrNfutJCzNJIgBwUS4BAS.mp3",
    },
    Carter: {
      us: "https://8ipgp5xevb8hkgbh.public.blob.vercel-storage.com/MockUpVoices/CarterUs2-rqsTkb2z7OKyzvTuoOLYP8e4MWy670.mp3",
      es: "https://8ipgp5xevb8hkgbh.public.blob.vercel-storage.com/MockUpVoices/CarterEs2-BGw06uKkp8fgSWe8oPz2oYWd7WR6FV.mp3",
      fr: "https://8ipgp5xevb8hkgbh.public.blob.vercel-storage.com/MockUpVoices/CarterFr2-uKL7cbkFGidnELRbEJO9b9BMOsZuKL.mp3",
      "zh-CN":
        "https://8ipgp5xevb8hkgbh.public.blob.vercel-storage.com/MockUpVoices/CarterCh2-Skj5itAyedho6bKwWVycj37ENDQApm.mp3",
    },
    Jack: {
      us: "https://8ipgp5xevb8hkgbh.public.blob.vercel-storage.com/MockUpVoices/JackUs2-W6g3FCxHMG99SuxogwHf9dmpuHDWyw.mp3",
      es: "https://8ipgp5xevb8hkgbh.public.blob.vercel-storage.com/MockUpVoices/JackEs2-BZhJxLVFtI5yk4LYodnUGvpNNeEurw.mp3",
      fr: "https://8ipgp5xevb8hkgbh.public.blob.vercel-storage.com/MockUpVoices/JackFr2-vKQdROa2BwMja310mBTE84J0swhJDH.mp3",
      "zh-CN":
        "https://8ipgp5xevb8hkgbh.public.blob.vercel-storage.com/MockUpVoices/JackCh2-IsMCxIIOAh4teQE2XQIGyknz3qP23U.mp3",
    },
    Maya: {
      us: "https://8ipgp5xevb8hkgbh.public.blob.vercel-storage.com/MockUpVoices/MayaUs2-o3Lobl4tPPIM65iHtE9xdvv1J8EOaU.mp3",
      es: "https://8ipgp5xevb8hkgbh.public.blob.vercel-storage.com/MockUpVoices/MayaEs2-piH6PS5lWG0XdHYLpWxTbr2HHcGH4l.mp3",
      fr: "https://8ipgp5xevb8hkgbh.public.blob.vercel-storage.com/MockUpVoices/MayaFr2-O3cVL6lkqLeHeMvbvm9uldYMWOSeTP.mp3",
      "zh-CN":
        "https://8ipgp5xevb8hkgbh.public.blob.vercel-storage.com/MockUpVoices/MayaCh2-8rAIOB0qLoVdOhrAi7ZXujx507DZBt.mp3",
    },
    Natalie: {
      us: "https://8ipgp5xevb8hkgbh.public.blob.vercel-storage.com/MockUpVoices/NatalieUs2-5Dw3AAauWSAKRiw9VWEQbnk8Jedwyp.mp3",
      es: "https://8ipgp5xevb8hkgbh.public.blob.vercel-storage.com/MockUpVoices/NatalieEs2-d38tt1hQcTOntFdjDwu9dcoh7U4Qe9.mp3",
      fr: "https://8ipgp5xevb8hkgbh.public.blob.vercel-storage.com/MockUpVoices/NatalieFr2-yE0EKlR7WcydaaxCws2dWrXMsPwG88.mp3",
      "zh-CN":
        "https://8ipgp5xevb8hkgbh.public.blob.vercel-storage.com/MockUpVoices/NatalieCh2-Hg9J0NNWOv4QWvCc3uKxt4C9Od2th5.mp3",
    },
    Ryan: {
      us: "https://8ipgp5xevb8hkgbh.public.blob.vercel-storage.com/MockUpVoices/RyanUs2-H6NtRn8cdMk8wG0zJ5nRczMCw3tqH9.mp3",
      es: "https://8ipgp5xevb8hkgbh.public.blob.vercel-storage.com/MockUpVoices/RyanEs2-nCiLzhuxsHsTN1uviAM5xKaa7YIQNc.mp3",
      fr: "https://8ipgp5xevb8hkgbh.public.blob.vercel-storage.com/MockUpVoices/RyanFr2-20wnc1odQY1qtYV5yJ4ztKGB30ATZ2.mp3",
      "zh-CN":
        "https://8ipgp5xevb8hkgbh.public.blob.vercel-storage.com/MockUpVoices/RyanCh2-RFcRO30O63hVQUrZVvIVQ38XuGiTGV.mp3",
    },
    Sara: {
      us: "https://8ipgp5xevb8hkgbh.public.blob.vercel-storage.com/MockUpVoices/SaraUs2-1ZYLmrZEk5tXDWvSJqx1i9tF7ncDEA.mp3",
      es: "https://8ipgp5xevb8hkgbh.public.blob.vercel-storage.com/MockUpVoices/SaraEs2-ae2JJVMU8o4snD17HaJejzltNicZ4p.mp3",
      fr: "https://8ipgp5xevb8hkgbh.public.blob.vercel-storage.com/MockUpVoices/SaraFr2-0LrRCD2UEM0QtVPPBMHsVxEzIhKJf8.mp3",
      "zh-CN":
        "https://8ipgp5xevb8hkgbh.public.blob.vercel-storage.com/MockUpVoices/SaraCh2-YhIGxRlXqaFbSf4lQk0O5kP5Tg15U0.mp3",
    },
    Scott: {
      us: "https://8ipgp5xevb8hkgbh.public.blob.vercel-storage.com/MockUpVoices/ScottUs2-aaFbQQKzC5U2EGQLDflfEDD5WIg20H.mp3",
      es: "https://8ipgp5xevb8hkgbh.public.blob.vercel-storage.com/MockUpVoices/ScottEs2-PUa5dXJDCVe7tfYchrGGaTNCvQYEgV.mp3",
      fr: "https://8ipgp5xevb8hkgbh.public.blob.vercel-storage.com/MockUpVoices/ScottFr2-YriHsq7pouWvcl6ZQCirljAzDg7s3Z.mp3",
      "zh-CN":
        "https://8ipgp5xevb8hkgbh.public.blob.vercel-storage.com/MockUpVoices/ScottCh2-MJg9H35Dm0yGf7XzTCDCNSn2auMy6A.mp3",
    },
  },
  "Write a Video Sales Letter": {
    Bria: {
      us: "https://8ipgp5xevb8hkgbh.public.blob.vercel-storage.com/MockupVoices/BriaUs3.mp3",
      es: "https://8ipgp5xevb8hkgbh.public.blob.vercel-storage.com/MockUpVoices/BriaEs3-FvKkyQDydAjiW1rurK6tta1SsAxRuc.mp3",
      fr: "https://8ipgp5xevb8hkgbh.public.blob.vercel-storage.com/MockUpVoices/BriaFr3-gnuFrkq4MjSuHCpK4CMPinRQMp5fAZ.mp3",
      "zh-CN":
        "https://8ipgp5xevb8hkgbh.public.blob.vercel-storage.com/MockUpVoices/BriaCh3-VgXjd5xr0Q7wUXm5h3qjpXonQlsjNp.mp3",
    },
    Carter: {
      us: "https://8ipgp5xevb8hkgbh.public.blob.vercel-storage.com/MockUpVoices/CarterUs3-e9Qzkn23YeJjpLqPUQkH0Aj9P1B5ib.mp3",
      es: "https://8ipgp5xevb8hkgbh.public.blob.vercel-storage.com/MockUpVoices/CarterEs3-GAVboxS1sFlKRYjwwRNhBj6Sqyep7q.mp3",
      fr: "https://8ipgp5xevb8hkgbh.public.blob.vercel-storage.com/MockUpVoices/CarterFr3-b5yzWaLHzg6hlaFSHv7xYzhjPVybMH.mp3",
      "zh-CN":
        "https://8ipgp5xevb8hkgbh.public.blob.vercel-storage.com/MockUpVoices/CarterCh3-MD5xKyVrGDZyjgzwCtjB1u9OEInJVG.mp3",
    },
    Jack: {
      us: "https://8ipgp5xevb8hkgbh.public.blob.vercel-storage.com/MockUpVoices/JackUs3-LB0Gx7MMaao2kwOaRTOQveMKgPSoBZ.mp3",
      es: "https://8ipgp5xevb8hkgbh.public.blob.vercel-storage.com/MockUpVoices/JackEs3-tPQIZCbyjCX8umAH9P9COML4RXT89q.mp3",
      fr: "https://8ipgp5xevb8hkgbh.public.blob.vercel-storage.com/MockUpVoices/JackFr3-aEJ9sHsqwt3ACbLmJa1ERJ07DbQYOS.mp3",
      "zh-CN":
        "https://8ipgp5xevb8hkgbh.public.blob.vercel-storage.com/MockUpVoices/JackCh3-fsmmTsGr4086jnHeGDjSuNf610wJFg.mp3",
    },
    Maya: {
      us: "https://8ipgp5xevb8hkgbh.public.blob.vercel-storage.com/MockUpVoices/MayaUs3-hfplTfTSVUgpkPc6hoIRZjtL4YIy59.mp3",
      es: "https://8ipgp5xevb8hkgbh.public.blob.vercel-storage.com/MockUpVoices/MayaEs3-XBK5Ly2hMWV3kZfSPRpaZEkBhmCMmy.mp3",
      fr: "https://8ipgp5xevb8hkgbh.public.blob.vercel-storage.com/MockUpVoices/MayaFr3-C5yOBdNCD5AhbjGVLoJOeprEQ1Dq9h.mp3",
      "zh-CN":
        "https://8ipgp5xevb8hkgbh.public.blob.vercel-storage.com/MockUpVoices/MayaCh3-46LjsNHx5XwKGNQAnJzBtUt6WmfJzG.mp3",
    },
    Natalie: {
      us: "https://8ipgp5xevb8hkgbh.public.blob.vercel-storage.com/MockUpVoices/NatalieUs3-MZS6sBskkuWi3CxESp3YtJIkt0PhLM.mp3",
      es: "https://8ipgp5xevb8hkgbh.public.blob.vercel-storage.com/MockUpVoices/NatalieEs3-K2XvkNw53YKOixjyE5KAjD3ujBopk4.mp3",
      fr: "https://8ipgp5xevb8hkgbh.public.blob.vercel-storage.com/MockUpVoices/NatalieFr3-CzQfnGykbXU4sMAc6GfKcZFkLvMzXB.mp3",
      "zh-CN":
        "https://8ipgp5xevb8hkgbh.public.blob.vercel-storage.com/MockUpVoices/NatalieCh3-L1xbt7NyQDQunCXFNCCAnNngvZjGYK.mp3",
    },
    Ryan: {
      us: "https://8ipgp5xevb8hkgbh.public.blob.vercel-storage.com/MockUpVoices/RyanUs3-roM6zctdLHiJbPXGL6fN6LIHgqLTKj.mp3",
      es: "https://8ipgp5xevb8hkgbh.public.blob.vercel-storage.com/MockUpVoices/RyanEs3-UP6c5mitmTLoG6dvl6KinjpWsSV2Id.mp3",
      fr: "https://8ipgp5xevb8hkgbh.public.blob.vercel-storage.com/MockUpVoices/RyanFr3-0tcWpWdrm85V1cItVX9FXu1jecZJlJ.mp3",
      "zh-CN":
        "https://8ipgp5xevb8hkgbh.public.blob.vercel-storage.com/MockUpVoices/RyanCh3-3UtJo3ulpSzMqR5saMQHy4hbgXJoTT.mp3",
    },
    Sara: {
      us: "https://8ipgp5xevb8hkgbh.public.blob.vercel-storage.com/MockUpVoices/SaraUs3-OmbWiS06OdrlPPuUQG72sAP90KOBJ6.mp3",
      es: "https://8ipgp5xevb8hkgbh.public.blob.vercel-storage.com/MockUpVoices/SaraEs3-tEi8ThyjeWywO4rS3w4SRYHK3xDmaF.mp3",
      fr: "https://8ipgp5xevb8hkgbh.public.blob.vercel-storage.com/MockUpVoices/SaraFr3-TRpv2jUGKAtXqkoDfjN130Z3BBfVBb.mp3",
      "zh-CN":
        "https://8ipgp5xevb8hkgbh.public.blob.vercel-storage.com/MockUpVoices/SaraCh3-5HkmT1Oab1undqVrwzhsDPsYy3ynFy.mp3",
    },
    Scott: {
      us: "https://8ipgp5xevb8hkgbh.public.blob.vercel-storage.com/MockUpVoices/ScottUs3-qHJIpx8j6gsqsEi9tY0KIia813QNh0.mp3",
      es: "https://8ipgp5xevb8hkgbh.public.blob.vercel-storage.com/MockUpVoices/ScottEs3-6dlyqLTtMcwnOmO5soXfSjlWpVK2mT.mp3",
      fr: "https://8ipgp5xevb8hkgbh.public.blob.vercel-storage.com/MockUpVoices/ScottFr3-J4A2x0Czx2aGwxdzpoJrCMCN93Fdxb.mp3",
      "zh-CN":
        "https://8ipgp5xevb8hkgbh.public.blob.vercel-storage.com/MockUpVoices/ScottCh3-bgxHhyHu18yd86KP4A8MTBxewoO1or.mp3",
    },
  },
};

const taskTexts = {
  "Value Proposition Story":
    "The most common struggle marketing professionals have is explaining why they are valuable and unique. If they fail, the cheapest price wins.  There is now a special tool that allows them to write, voice, illustrate, and pitch their special value so they can increase their rates and lower work hours.",
  "Podcast Introduction":
    "Welcome to ‘Tech Horizons,’ the podcast that explores the cutting edge of innovation and the brilliant minds shaping our  future. I’m your host, Jamie, and in today’s episode we cover the biggest problem in business today...",
  "Write a Video Sales Letter":
    "Are you a marketing executive looking to captivate and engage your audience more effectively? In today’s competitive market, the ability to craft compelling stories is not just an advantage; it’s a necessity. Introducing….",
};

export default function VoiceGeneratorMockup() {
  const [activeTab, setActiveTab] = useState("Text to speech");
  const [selectedVoice, setSelectedVoice] = useState(voices[0]);
  const [selectedTask, setSelectedTask] = useState(tasks[0]);
  const [selectedLanguage, setSelectedLanguage] = useState(languages[0]);
  const [text, setText] = useState(taskTexts[selectedTask]);

  const handlePlay = () => {
    const audioUrl =
      audioSamples[selectedTask]?.[selectedVoice]?.[selectedLanguage.code];
    if (audioUrl) {
      const audio = new Audio(audioUrl);
      audio.play();
    } else {
      console.error("Audio sample not found for the selected combination");
    }
  };

  const handleTaskChange = (task: string) => {
    setSelectedTask(task);
    setText(taskTexts[task]);
  };

  return (
    <div className="mx-auto max-w-3xl rounded-lg bg-white p-6 shadow-lg">
      <div className="mb-6 flex space-x-4">
        {[
          "Text to speech",
          "Voice Cloning",
          "Script Ai",
          "Translations",
          "Screen Recorder",
        ].map((tab) => (
          <motion.button
            key={tab}
            className={`rounded-full px-4 py-2 text-sm font-medium ${
              activeTab === tab
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
            onClick={() => setActiveTab(tab)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {tab}
          </motion.button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === "Text to speech" && (
            <div>
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="mb-4 h-32 w-full rounded border border-gray-300 p-2"
                maxLength={500}
              />

              <div className="mb-4 flex items-center space-x-4">
                <Select
                  value={selectedLanguage.code}
                  onValueChange={(value) =>
                    setSelectedLanguage(
                      languages.find((lang) => lang.code === value) ||
                        languages[0],
                    )
                  }
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    {languages.map((lang) => (
                      <SelectItem key={lang.code} value={lang.code}>
                        {lang.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <div className="flex space-x-2">
                  {tasks.map((task) => (
                    <motion.button
                      key={task}
                      className={`rounded-full px-4 py-2 text-sm font-medium ${
                        selectedTask === task
                          ? "bg-orange-500 text-white"
                          : "bg-gray-200 text-gray-700"
                      }`}
                      onClick={() => handleTaskChange(task)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {task}
                    </motion.button>
                  ))}
                </div>
              </div>

              <div className="mb-4 flex items-center justify-between">
                <Select value={selectedVoice} onValueChange={setSelectedVoice}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select voice" />
                  </SelectTrigger>
                  <SelectContent>
                    {voices.map((voice) => (
                      <SelectItem key={voice} value={voice}>
                        {voice}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-500">
                    {text.length}/500
                  </span>
                  <Button onClick={handlePlay} size="icon">
                    <Play className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          )}

          {activeTab === "Voice Cloning" && (
            <div className="py-8 text-center">
              <h2 className="mb-4 text-2xl font-bold">
                Speech to Speech Conversion
              </h2>
              <p className="mb-4">
                Upload an audio file or record your voice to convert it to
                another voice or language.
              </p>
              <Button className="bg-blue-600 text-white hover:bg-blue-700">
                Upload Audio or Start Recording
              </Button>
            </div>
          )}

          {activeTab === "Script Ai" && (
            <div className="py-8 text-center">
              <h2 className="mb-4 text-2xl font-bold">Video Dubbing</h2>
              <p className="mb-4">
                Upload a video file to dub it in another language or voice.
              </p>
              <Button className="bg-blue-600 text-white hover:bg-blue-700">
                Upload Video
              </Button>
            </div>
          )}

          {activeTab === "Translations" && (
            <div className="py-8 text-center">
              <h2 className="mb-4 text-2xl font-bold">Text to Sound Effects</h2>
              <p className="mb-4">
                Enter text to generate corresponding sound effects.
              </p>
              <textarea
                placeholder="Enter text for sound effects..."
                className="mb-4 h-32 w-full rounded border border-gray-300 p-2"
              />
              <Button className="bg-blue-600 text-white hover:bg-blue-700">
                Generate SFX
              </Button>
            </div>
          )}

          {activeTab === "Screen Recorder" && (
            <div className="py-8 text-center">
              <h2 className="mb-4 text-2xl font-bold">Voice Cloning</h2>
              <p className="mb-4">
                Upload audio samples to clone a voice for text-to-speech
                conversion.
              </p>
              <Button className="bg-blue-600 text-white hover:bg-blue-700">
                Start Voice Cloning
              </Button>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      <Button className="mt-6 w-full bg-blue-600 text-white hover:bg-blue-700">
        EXPERIENCE THE FULL AUDIO AI PLATFORM
      </Button>
    </div>
  );
}

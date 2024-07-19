import * as React from "react";
import Image from "next/image";

// import Loadingdots
import languages from "~/lib/languages";

export default function AudioTranslate({}) {
  const [loading, setLoading] = React.useState(false);
  const [language, setLanguage] = React.useState<string>(languages[0]?.value);
  const [generatedTranslation, setGeneratedTranslation] = React.useState<string>("");
  
}

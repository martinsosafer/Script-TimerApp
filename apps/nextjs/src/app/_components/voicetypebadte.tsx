const VoiceTypeBadge: React.FC<{ type: string }> = ({ type }) => {
  const typeStyles = {
    "11LABS": "bg-purple-100 text-purple-800",
    GOOGLE: "bg-green-100 text-green-800",
    OTHER: "bg-gray-100 text-gray-800",
  };

  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${typeStyles[type]}`}
    >
      {type}
    </span>
  );
};

export default VoiceTypeBadge;

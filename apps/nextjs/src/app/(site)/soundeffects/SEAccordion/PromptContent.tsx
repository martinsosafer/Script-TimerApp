import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@voiceai/ui/@/components/ui/accordion";

export default function PromptingGuideContent() {
  return (
    <Accordion type="multiple" className="w-full">
      <AccordionItem value="simple-effects">
        <AccordionTrigger>Simple effects</AccordionTrigger>
        <AccordionContent>
          <p>For basic sound effects, use clear, concise descriptions:</p>
          <ul className="mt-2 list-disc pl-6">
            <li>&quot;Glass shattering on concrete&quot;</li>
            <li>&quot;Heavy wooden door creaking open&quot;</li>
            <li>&quot;Thunder rumbling in the distance&quot;</li>
          </ul>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="complex-sequences">
        <AccordionTrigger>Complex sequences</AccordionTrigger>
        <AccordionContent>
          <p>For multi-part sound effects, describe the sequence of events:</p>
          <ul className="mt-2 list-disc pl-6">
            <li>&quot;Footsteps on gravel, then a metallic door opens&quot;</li>
            <li>
              &quot;Wind whistling through trees, followed by leaves
              rustling&quot;
            </li>
            <li>
              &quot;Sword being drawn, then clashing with another blade&quot;
            </li>
          </ul>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="musical-elements">
        <AccordionTrigger>Musical elements</AccordionTrigger>
        <AccordionContent>
          <p>The API also supports generation of musical components:</p>
          <ul className="mt-2 list-disc pl-6">
            <li>&quot;90s hip-hop drum loop, 90 BPM&quot;</li>
            <li>&quot;Vintage brass stabs in F minor&quot;</li>
            <li>&quot;Atmospheric synth pad with subtle modulation&quot;</li>
          </ul>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="audio-terminology">
        <AccordionTrigger>Audio Terminology</AccordionTrigger>
        <AccordionContent>
          <p>Common terms that can enhance your prompts:</p>
          <ul className="mt-2 list-disc pl-6">
            <li>
              <strong>Impact:</strong> Collision or contact sounds between
              objects, from subtle taps to dramatic crashes
            </li>
            <li>
              <strong>Whoosh:</strong> Movement through air effects, ranging
              from fast and ghostly to slow-spinning or rhythmic
            </li>
            <li>
              <strong>Ambience:</strong> Background environmental sounds that
              establish atmosphere and space
            </li>
            <li>
              <strong>One-shot:</strong> Single, non-repeating sound
            </li>
            <li>
              <strong>Loop:</strong> Repeating audio segment
            </li>
            <li>
              <strong>Stem:</strong> Isolated audio component
            </li>
            <li>
              <strong>Braam:</strong> Big, brassy cinematic hit that signals
              epic or dramatic moments, common in trailers
            </li>
            <li>
              <strong>Glitch:</strong> Sounds of malfunction, jittering, or
              erratic movement, useful for transitions and sci-fi
            </li>
            <li>
              <strong>Drone:</strong> Continuous, textured sound that creates
              atmosphere and suspense
            </li>
          </ul>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

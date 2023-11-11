export const About = () => {
  return (
    <div className="rounded-lg shadow-lg p-6">
      <p className="text-white text-center text-xl">💡 Help</p>
      <br></br>
      <h2 className="text-xl font-bold">⚡️ About</h2>
      <br></br>
      <p>
        {`At live events, speakers inspire, entertain, and educate. 
          With nostr and Event Zapper, attendees can instantly "Zap" 
          speakers, giving immediate feedback and fostering interactivity.`}
      </p>
      <br></br>
      <p>
        {`New to nostr and zapping? `}
        <a href="https://nostr.how/" target="_blank" className="text-[#a855f7]">
          Learn more here.
        </a>
      </p>
      <br></br>
      <hr className="my-2" />
      <br></br>
      <h2 className="text-xl font-bold">🎙️ Speaker Setup</h2>
      <br></br>
      <p>
        {`Paste each speaker's nostr public key (npub) in to the "Speaker's
          Public Key" field, and click "Add Speaker"`}
      </p>
      <br></br>
      <p>
        {`If the speaker doesn't use nostr, you can toggle off "Has nostr
          profile" and manually specify a name and picture for them. Paste a
          nostr public key of the speaker's choosing in to the "Donation Public
          Key" field. Zaps will be redirected the donation profile instead.`}
      </p>
      <br></br>
      <hr className="my-2" />
      <br></br>
      <h2 className="text-xl font-bold">📽️ Presenting</h2>
      <br></br>
      <p>
        {`Click "Present" to open the Presentation screen. Speakers configured 
          during setup will be displayed here. A QR code for each speaker will
          be generated and displayed alongside the speaker's picture and name.`}
      </p>
      <br></br>
      <p>
        {`Audience members can scan the QR codes to open the speaker's nostr
          profile in their default nostr client. Zaps sent to the Speaker's nostr 
          profile will be displayed under the speaker in realtime! 🎉`}
      </p>
      <br></br>
      <hr className="my-2" />
      <br></br>
      <h2 className="text-xl font-bold">🐞 Found a bug?</h2>
      <br></br>
      <p>
        {`Report bugs to the `}
        <a href="https://github.com/owen1917/event-zapper/issues" target="_blank" className="text-[#a855f7]">
          Event Zapper GitHub page.
        </a>
      </p>
    </div>
  );
};

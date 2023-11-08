export const About = () => {
  return (
    <div className="rounded-lg shadow-lg p-6">
      <p className="text-white text-center text-xl">💡 Help</p>
      <h2 className="text-xl font-bold">About</h2>
      <p>
        {`With Event Zapper, attendees at meetups or conferences can "Zap" the
            speakers (send micro Bitcoin "tips") through nostr, the decentralized
            social protocol. This way, the audience can show their appreciation
            whenever they feel inspired, entertained, or informed by the content.`}
      </p>
      <p>
        <a href="https://nostr.how/" className="text-[#a855f7]">
          Learn more about nostr and zapping here.
        </a>
      </p>
      <hr className="my-2" />
      <h2 className="text-xl font-bold">Event Setup</h2>
      <p>
        {`Paste each speaker's nostr public key (npub) in to the "Speaker's
          Public Key" field. The speaker's profile picture and name will be
          automatically populated. To receive Zaps, the speaker must already
          have a Bitcoin/Lightning address added to their nostr profile.`}
      </p>
      <p>
        {`If the speaker doesn't use nostr, you can toggle off "Has nostr
          profile" and manually specify a name and picture for them. Paste a
          nostr public key of the speaker's choosing in to the "Donation Public
          Key" field. Zaps will be redirected the donation profile instead.`}
      </p>
      <hr className="my-2" />
      <h2 className="text-xl font-bold">Presenting</h2>
      <p>
        {`Click "Present" to open the Presentation screen - this is what you
          will display to your audience. Speakers configured on during setup
          will be displayed here.`}
      </p>
      <p>
        {`A QR code for each speaker will be generated and displayed alongside
          the speaker's nostr profile picture and name.`}
      </p>
      <p>
        {`Audience members can scan the QR code to open the speaker's nostr
          profile in their default nostr client. Zaps sent to the specified
          nostr profile will be displayed under the speaker in realtime!`}
      </p>
      <hr className="my-2" />
      <h2 className="text-xl font-bold">Found a bug?</h2>
      <p>
        {`Report bugs to `}
        <a
          href="https://github.com/owen1917/event-zapper/issues"
          className="text-[#a855f7]"
        >
          the Event Zapper GitHub page.
        </a>
      </p>
    </div>
  );
};

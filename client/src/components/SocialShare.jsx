import React from "react";
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  LinkedinShareButton,
  FacebookIcon,
  TwitterIcon,
  WhatsappIcon,
  LinkedinIcon,
} from "react-share";

export default function SocialShare({ url, title }) {
  return (
    <div className="flex items-center gap-2">
      <FacebookShareButton url={url} quote={title}><FacebookIcon size={32} round /></FacebookShareButton>
      <TwitterShareButton url={url} title={title}><TwitterIcon size={32} round /></TwitterShareButton>
      <WhatsappShareButton url={url} title={title}><WhatsappIcon size={32} round /></WhatsappShareButton>
      <LinkedinShareButton url={url} title={title}><LinkedinIcon size={32} round /></LinkedinShareButton>
    </div>
  );
}

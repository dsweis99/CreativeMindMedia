export type CampaignExampleType = 'video' | 'audit' | 'image';

export type CampaignExample = {
  id: string;
  type: CampaignExampleType;
  title: string;
  description: string;
  mediaUrl: string;
  actionUrl: string;
};

export type FeaturedOffer = {
  enabled: boolean;
  campaignType: string;
  eyebrow: string;
  title: string;
  description: string;
  buttonLabel: string;
  formPrompt: string;
  examplesEnabled: boolean;
  examplesHeading: string;
  examplesDescription: string;
  examples: CampaignExample[];
};

export const defaultFeaturedOffer: FeaturedOffer = {
  enabled: true,
  campaignType: 'Free Video',
  eyebrow: 'Content that earns attention',
  title: 'You don’t need more content. You need better ones.',
  description: 'Start with a focused idea for your business. Tell us what you want to promote and we’ll take it from there.',
  buttonLabel: 'Book a Free Video',
  formPrompt: 'What would you like to promote?',
  examplesEnabled: true,
  examplesHeading: 'A look at the work',
  examplesDescription: 'A few examples of content created to stop the scroll and get noticed.',
  examples: [],
};

export const featuredOfferPresets: FeaturedOffer[] = [
  defaultFeaturedOffer,
  { ...defaultFeaturedOffer, campaignType: 'Website Audit', eyebrow: 'A clearer website starts here', title: 'Find what’s holding your website back.', description: 'Get a practical look at where your website is losing attention, trust, or enquiries.', buttonLabel: 'Get a Free Website Audit', formPrompt: 'What would you like us to review on your website?', examplesHeading: 'What a website audit can uncover', examplesDescription: 'Show a few findings or before-and-after examples from real website audits.' },
  { ...defaultFeaturedOffer, campaignType: 'Social Media Audit', eyebrow: 'Make your content work harder', title: 'Your social media can do more.', description: 'Get a focused review of your content, positioning, and opportunities to turn attention into action.', buttonLabel: 'Get a Free Social Media Audit', formPrompt: 'What would you like us to review on your social media?', examplesHeading: 'What we look for', examplesDescription: 'Share examples of content, positioning, or feed improvements from past audits.' },
  { ...defaultFeaturedOffer, campaignType: 'Brand Review', eyebrow: 'See your brand with fresh eyes', title: 'Make your brand easier to choose.', description: 'Get an outside perspective on your message, visual presence, and the next move for your business.', buttonLabel: 'Get a Free Brand Review', formPrompt: 'What would you like us to review about your brand?', examplesHeading: 'Brand review examples', examplesDescription: 'Show examples of the brand opportunities and recommendations you identify.' },
];

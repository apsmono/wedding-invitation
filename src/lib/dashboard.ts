import type { InvitationContent } from "../content/invitation";

export const DASHBOARD_CONTENT_KEY = "wedding-invitation.dashboard-content";
export const DASHBOARD_VERSIONS_KEY = "wedding-invitation.dashboard-versions";
export const DASHBOARD_MAX_VERSIONS = 10;

export type DashboardEditor = {
  partnerOneFirst: string;
  partnerOneDisplay: string;
  partnerTwoFirst: string;
  partnerTwoDisplay: string;
  displayName: string;
  isoDate: string;
  dateLabel: string;
  fullDateLabel: string;
  heroEyebrow: string;
  heroLede: string;
  storyBody: string;
  venueName: string;
  venueCity: string;
  venueAddress: string;
  summaryHeadline: string;
  invitationHighlights: string;
  guestGuideBody: string;
  questionEmail: string;
  contactEmail: string;
  footerNote: string;
};

export type DashboardVersion = {
  id: string;
  createdAt: string;
  note: string;
  content: InvitationContent;
};

function canUseStorage() {
  return typeof window !== "undefined";
}

function splitLines(value: string) {
  return value
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

export function cloneInvitationContent(
  content: InvitationContent,
): InvitationContent {
  return JSON.parse(JSON.stringify(content)) as InvitationContent;
}

export function createDashboardEditor(
  content: InvitationContent,
): DashboardEditor {
  return {
    partnerOneFirst: content.couple.partnerOne.first,
    partnerOneDisplay: content.couple.partnerOne.display,
    partnerTwoFirst: content.couple.partnerTwo.first,
    partnerTwoDisplay: content.couple.partnerTwo.display,
    displayName: content.couple.displayName,
    isoDate: content.event.isoDate,
    dateLabel: content.event.dateLabel,
    fullDateLabel: content.event.fullDateLabel,
    heroEyebrow: content.hero.eyebrow,
    heroLede: content.hero.lede,
    storyBody: content.story.body,
    venueName: content.event.venue.name,
    venueCity: content.event.venue.city,
    venueAddress: content.event.venue.addressLines.join("\n"),
    summaryHeadline: content.invitationSummary.headline,
    invitationHighlights: content.invitationSummary.highlights.join("\n"),
    guestGuideBody: content.guestGuide.body,
    questionEmail: content.rsvp.questionEmail,
    contactEmail: content.rsvp.contactEmail,
    footerNote: content.footerNote,
  };
}

export function applyDashboardEditor(
  content: InvitationContent,
  editor: DashboardEditor,
): InvitationContent {
  const nextContent = cloneInvitationContent(content);

  nextContent.couple.partnerOne.first = editor.partnerOneFirst.trim();
  nextContent.couple.partnerOne.display = editor.partnerOneDisplay.trim();
  nextContent.couple.partnerTwo.first = editor.partnerTwoFirst.trim();
  nextContent.couple.partnerTwo.display = editor.partnerTwoDisplay.trim();
  nextContent.couple.displayName = editor.displayName.trim();
  nextContent.event.isoDate = editor.isoDate.trim();
  nextContent.event.dateLabel = editor.dateLabel.trim();
  nextContent.event.fullDateLabel = editor.fullDateLabel.trim();
  nextContent.hero.eyebrow = editor.heroEyebrow.trim();
  nextContent.hero.lede = editor.heroLede.trim();
  nextContent.story.body = editor.storyBody.trim();
  nextContent.event.venue.name = editor.venueName.trim();
  nextContent.event.venue.city = editor.venueCity.trim();
  nextContent.event.venue.addressLines = splitLines(editor.venueAddress);
  nextContent.invitationSummary.headline = editor.summaryHeadline.trim();
  nextContent.invitationSummary.highlights = splitLines(
    editor.invitationHighlights,
  );
  nextContent.guestGuide.body = editor.guestGuideBody.trim();
  nextContent.rsvp.questionEmail = editor.questionEmail.trim();
  nextContent.rsvp.contactEmail = editor.contactEmail.trim();
  nextContent.rsvp.secondaryCta.href = nextContent.rsvp.questionEmail
    ? `mailto:${nextContent.rsvp.questionEmail}?subject=Pertanyaan%20Undangan`
    : "";
  nextContent.footerNote = editor.footerNote.trim();

  return nextContent;
}

export function readStoredDashboardContent() {
  if (!canUseStorage()) {
    return null;
  }

  const raw = window.localStorage.getItem(DASHBOARD_CONTENT_KEY);

  if (!raw) {
    return null;
  }

  try {
    return JSON.parse(raw) as InvitationContent;
  } catch {
    return null;
  }
}

export function persistDashboardContent(content: InvitationContent) {
  if (!canUseStorage()) {
    return;
  }

  window.localStorage.setItem(
    DASHBOARD_CONTENT_KEY,
    JSON.stringify(cloneInvitationContent(content)),
  );
}

export function clearStoredDashboardContent() {
  if (!canUseStorage()) {
    return;
  }

  window.localStorage.removeItem(DASHBOARD_CONTENT_KEY);
}

export function readStoredDashboardVersions() {
  if (!canUseStorage()) {
    return [] as DashboardVersion[];
  }

  const raw = window.localStorage.getItem(DASHBOARD_VERSIONS_KEY);

  if (!raw) {
    return [] as DashboardVersion[];
  }

  try {
    return JSON.parse(raw) as DashboardVersion[];
  } catch {
    return [] as DashboardVersion[];
  }
}

export function persistDashboardVersions(versions: DashboardVersion[]) {
  if (!canUseStorage()) {
    return;
  }

  window.localStorage.setItem(DASHBOARD_VERSIONS_KEY, JSON.stringify(versions));
}

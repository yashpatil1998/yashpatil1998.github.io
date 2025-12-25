import { Stack, Typography } from "@mui/material";

const PrivacyPolicyPage = () => {
  return (
    <Stack spacing={4}>
      {/* Header */}
      <Stack spacing={1}>
        <Typography component="h1" variant="h4" fontWeight={700}>
          Privacy Policy
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Last updated: 24 December 2025
        </Typography>
      </Stack>

      {/* Introduction */}
      <Typography>
        This Privacy Policy describes how Yash Patil ("we", "our", or "us")
        collects, uses, and protects information when you visit
        https://yashpatil1998.github.io (the "Website"). By using this Website,
        you agree to the collection and use of information in accordance with
        this policy.
      </Typography>

      {/* Information We Collect */}
      <Stack spacing={1}>
        <Typography variant="h6" fontWeight={600}>
          Information We Collect
        </Typography>
        <Typography>
          We do not require users to register or directly provide personal
          information on this Website. However, certain non-personal information
          may be collected automatically, including browser type, device
          information, IP address, pages visited, and time spent on pages.
        </Typography>
      </Stack>

      {/* Cookies */}
      <Stack spacing={1}>
        <Typography variant="h6" fontWeight={600}>
          Cookies
        </Typography>
        <Typography>
          This Website uses cookies and similar technologies to improve user
          experience, analyze traffic, and display relevant advertisements.
          Cookies are small text files stored on your device.
        </Typography>
        <Typography>
          You can choose to disable cookies through your browser settings.
          Please note that disabling cookies may affect how the Website
          functions.
        </Typography>
      </Stack>

      {/* Google AdSense */}
      <Stack spacing={1}>
        <Typography variant="h6" fontWeight={600}>
          Google AdSense
        </Typography>
        <Typography>
          This Website uses Google AdSense, a third-party advertising service.
          Google uses cookies, including the DoubleClick cookie, to serve ads to
          users based on their visits to this and other websites.
        </Typography>
        <Typography>
          Users may opt out of personalized advertising by visiting Google Ad
          Settings at https://adssettings.google.com. More information about how
          Google manages user data can be found at
          https://policies.google.com/privacy.
        </Typography>
      </Stack>

      {/* Third-Party Services */}
      <Stack spacing={1}>
        <Typography variant="h6" fontWeight={600}>
          Third-Party Services
        </Typography>
        <Typography>
          This Website may use third-party services such as Google Analytics for
          traffic analysis and GitHub Pages for hosting. These services may
          collect information in accordance with their own privacy policies.
        </Typography>
      </Stack>

      {/* How Information Is Used */}
      <Stack spacing={1}>
        <Typography variant="h6" fontWeight={600}>
          How We Use Information
        </Typography>
        <Typography>
          Collected information is used to operate and maintain the Website,
          improve content and user experience, analyze usage patterns, and serve
          relevant advertisements.
        </Typography>
      </Stack>

      {/* Children's Information */}
      <Stack spacing={1}>
        <Typography variant="h6" fontWeight={600}>
          Children’s Information
        </Typography>
        <Typography>
          This Website is not intended for children under the age of 13. We do
          not knowingly collect any personal information from children.
        </Typography>
      </Stack>

      {/* Updates */}
      <Stack spacing={1}>
        <Typography variant="h6" fontWeight={600}>
          Updates to This Policy
        </Typography>
        <Typography>
          This Privacy Policy may be updated from time to time. Any changes will
          be posted on this page with an updated revision date.
        </Typography>
      </Stack>

      {/* Contact */}
      <Stack spacing={1}>
        <Typography variant="h6" fontWeight={600}>
          Contact
        </Typography>
        <Typography>
          If you have any questions about this Privacy Policy, you may contact
          me at: <strong>yashpatil1998@gmail.com</strong>
        </Typography>
      </Stack>
    </Stack>
  );
};

export default PrivacyPolicyPage;

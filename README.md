# Global Wellness Guide

Generate personalized, educational recovery plans using natural therapies. Your guide to holistic wellness.

## Features

- **Multilingual Intake Form**: Describe your symptoms in any language
- **AI-Powered Analysis**: Uses Google Generative AI for personalized wellness insights
- **Comprehensive Recovery Plans**: Including natural therapies like Ayurveda, herbal medicine, and lifestyle recommendations
- **Daily Wellness Routines**: Structured plans for daily activities and self-care
- **Educational Approach**: Provides information without medical prescriptions
- **Download Plans**: Save your wellness plan as HTML for offline access

## Tech Stack

- **Framework**: Next.js 15.5.18+ with App Router
- **Styling**: Tailwind CSS with custom color scheme
- **AI**: Google Generative AI (@google/genai)
- **Form Handling**: React Hook Form with Zod validation
- **Fonts**: Belleza (headlines) & Alegreya (body)

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn
- Google Generative AI API key

### Installation

1. Clone the repository:
```bash
git clone https://github.com/rajkumar-40/Global-Wellness-Guide.git
cd Global-Wellness-Guide
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables (see [Environment Setup](#environment-setup))

4. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Environment Setup

### Local Development

1. Create a `.env.local` file in the root directory:
```bash
GOOGLE_GENAI_API_KEY=your_api_key_here
```

2. Get your API key:
   - Visit [Google AI Studio](https://aistudio.google.com/app/apikeys)
   - Click "Create API Key"
   - Copy the generated key and add it to `.env.local`

### Production (Vercel)

1. Go to your Vercel project dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add the following variable for all environments:
   - **Name**: `GOOGLE_GENAI_API_KEY`
   - **Value**: Your Google Generative AI API key
4. Redeploy your application

## Available Scripts

```bash
# Development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run TypeScript compiler check
npm run type-check

# Run linter
npm run lint
```

## Project Structure

```
Global-Wellness-Guide/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout with theme setup
│   │   ├── page.tsx            # Home page with wellness form
│   │   └── actions.ts          # Server actions (AI generation)
│   ├── components/
│   │   ├── intake-form.tsx     # Multi-language symptom input
│   │   ├── recovery-plan-display.tsx  # Display generated plans
│   │   ├── ui/                 # Reusable UI components
│   │   ├── header.tsx
│   │   └── footer.tsx
│   └── lib/                    # Utility functions
├── docs/                       # Documentation and guides
├── public/                     # Static assets
└── package.json
```

## Design System

- **Primary Color**: Soft lavender (#E6E6FA)
- **Background**: Very light grayish-purple (#F5F5FF)
- **Accent**: Pale cyan (#E0FFFF)
- **Fonts**: Belleza (serif, headlines) & Alegreya (serif, body)

## Security Notes

- ⚠️ **Never commit `.env.local`** - it's git-ignored for your protection
- 🔄 **Rotate API keys** if they are ever exposed in version control
- ✅ API keys are only read from environment variables on the server
- ✅ All sensitive operations are server-side

## API Limitations

- Free Google Generative AI tier has usage limits
- For production use, consider upgrading your Google Cloud plan

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import the repository in [Vercel](https://vercel.com)
3. Add environment variables (see [Production Setup](#production-vercel))
4. Deploy with a single click

### Other Platforms

This is a standard Next.js application and can be deployed to any platform that supports Node.js:
- Netlify
- AWS Amplify
- Google Cloud Run
- Digital Ocean App Platform

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the MIT License.

## Support

For issues, questions, or suggestions, please open an issue on GitHub.

---

**Created with ❤️ by rajkumar-40**

[Visit the Live Site](https://global-wellness-guide.vercel.app) · [GitHub Repository](https://github.com/rajkumar-40/Global-Wellness-Guide)

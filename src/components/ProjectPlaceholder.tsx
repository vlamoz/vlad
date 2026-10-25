import { memo } from 'react';
import { m } from 'framer-motion';
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import java from 'react-syntax-highlighter/dist/esm/languages/prism/java';
import { vscDarkPlus, oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useTheme } from '../contexts/ThemeContext';

// Only Java is shown, so register just that grammar instead of bundling all of Prism
SyntaxHighlighter.registerLanguage('java', java);

// Code snippet shown for each project, keyed by work item id
const CODE_SNIPPETS: Record<string, string> = {
  interprefy: `@RequiredArgsConstructor
public class AITranslationService {
  private final SpeechToTextEngine sttEngine;
  private final TranslationEngine translationEngine;
  private final TextToSpeechEngine ttsEngine;
  
  public AudioStream process(AudioStream input) {
    // Real-time AI translation pipeline
    return ttsEngine.generate(
        translationEngine.translate(
            sttEngine.transcribe(input)));
  }
}`,
  nasdaq: `@MessageEndpoint
public class FinancialMessageHub {
  @ServiceActivator(inputChannel = "trades")
  public Message<Trade> routeMessage(Message<Trade> msg) {
    // Route to Baltic financial institutions
    return messageRouter.route(msg);
  }
}`,
  audatex: `@RequiredArgsConstructor
@RestController
@RequestMapping("/api/vehicle")
public class InsuranceClaimService {
  private final ClaimProcessor claimProcessor;
  @PostMapping("/claims")
  public ResponseEntity<Claim> processClaim(@RequestBody ClaimRequest request) {
    // B2B integration logic
    return ResponseEntity.ok(claimProcessor.process(request));
  }
}`,
  elisa: `@RequiredArgsConstructor
public class RoamingDataProcessor {
  private final RateParser parser;
  private final RateService rateService;
  public void importPartnerData(MultipartFile file) {
    // Handle TADIG telecom versioned data format
    DataFormat format = detectFormat(file);
    List<RoamingRate> rates = parser.parse(file, format);
    rateService.processVersionedRates(rates);
  }
}`,
  government: `@RequiredArgsConstructor
@Service
public class WelfareApplicationService {
  private final ApplicationService applicationService;
  @Transactional
  public Application processApplication(CitizenRequest request) {
    // Estonian e-government integration
    validateCitizen(request.getPersonalCode());
    return applicationService.process(application);
  }
}`
};

// Theme styles with a transparent background, built once per theme
const withTransparentBackground = (syntaxTheme: typeof oneLight) => ({
  ...syntaxTheme,
  'pre[class*="language-"]': {
    ...syntaxTheme['pre[class*="language-"]'],
    background: 'transparent',
    margin: 0,
    padding: 0,
    fontSize: '0.875rem',
  },
  'code[class*="language-"]': {
    ...syntaxTheme['code[class*="language-"]'],
    background: 'transparent',
    fontSize: '0.875rem',
  }
});

const SYNTAX_STYLES = {
  light: withTransparentBackground(oneLight),
  dark: withTransparentBackground(vscDarkPlus),
};

const LINE_NUMBER_STYLES = {
  light: { color: '#9ca3af', marginRight: '1rem', minWidth: '2em' },
  dark: { color: '#4a5568', marginRight: '1rem', minWidth: '2em' },
};

const CUSTOM_STYLE = { background: 'transparent', padding: 0 };

interface ProjectPlaceholderProps {
  id: string;
  title: string;
  index: number;
}

const ProjectPlaceholder = memo(({ id, title, index }: ProjectPlaceholderProps) => {
  const { theme } = useTheme();

  return (
    <div className="aspect-video bg-gray-100 dark:bg-gray-900 rounded-lg overflow-hidden shadow-xl relative group border border-gray-200 dark:border-gray-700">
      {/* Code Editor Header */}
      <div className="bg-gray-200 dark:bg-gray-800 px-4 py-2 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 shrink-0">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <div className="text-xs text-gray-600 dark:text-gray-400 font-mono truncate">{title}</div>
      </div>

      {/* Code Content */}
      <div className="p-4 relative overflow-auto">
        {/* Syntax Highlighted Code */}
        <m.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
          className="relative z-10"
        >
          <SyntaxHighlighter
            language="java"
            style={SYNTAX_STYLES[theme]}
            showLineNumbers
            lineNumberStyle={LINE_NUMBER_STYLES[theme]}
            wrapLines={true}
            customStyle={CUSTOM_STYLE}
          >
            {CODE_SNIPPETS[id]}
          </SyntaxHighlighter>
        </m.div>
      </div>
    </div>
  );
});

ProjectPlaceholder.displayName = 'ProjectPlaceholder';

export default ProjectPlaceholder;

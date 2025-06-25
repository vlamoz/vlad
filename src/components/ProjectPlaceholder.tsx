import { motion } from 'framer-motion';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useTheme } from '../contexts/ThemeContext';

interface ProjectPlaceholderProps {
  title: string;
  index: number;
}

const ProjectPlaceholder = ({ title, index }: ProjectPlaceholderProps) => {
  const { theme } = useTheme();

  // Create a code snippet based on project
  const getCodeSnippet = (projectTitle: string) => {
    if (projectTitle.includes('Interprefy')) {
      return `@RequiredArgsConstructor
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
}`;
    } else if (projectTitle.includes('NASDAQ')) {
      return `@MessageEndpoint
public class FinancialMessageHub {
  @ServiceActivator(inputChannel = "trades")
  public Message<Trade> routeMessage(Message<Trade> msg) {
    // Route to Baltic financial institutions
    return messageRouter.route(msg);
  }
}`;
    } else if (projectTitle.includes('AudaNet')) {
      return `@RequiredArgsConstructor
@RestController
@RequestMapping("/api/vehicle")
public class InsuranceClaimService {
  private final ClaimProcessor claimProcessor;
  @PostMapping("/claims")
  public ResponseEntity<Claim> processClaim(@RequestBody ClaimRequest request) {
    // B2B integration logic
    return ResponseEntity.ok(claimProcessor.process(request));
  }
}`;
    } else if (projectTitle.includes('YouRoam')) {
      return `@RequiredArgsConstructor
public class RoamingDataProcessor {
  private final RateParser parser;
  private final RateService rateService;
  public void importPartnerData(MultipartFile file) {
    // Handle TADIG telecom versioned data format
    DataFormat format = detectFormat(file);
    List<RoamingRate> rates = parser.parse(file, format);
    rateService.processVersionedRates(rates);
  }
}`;
    } else {
      return `@RequiredArgsConstructor
@Service
public class WelfareApplicationService {
  private final ApplicationService applicationService;
  @Transactional
  public Application processApplication(CitizenRequest request) {
    // Estonian e-government integration
    validateCitizen(request.getPersonalCode());
    return applicationService.process(application);
  }
}`;
    }
  };

  const codeString = getCodeSnippet(title);

  // Choose theme based on current mode
  const syntaxTheme = theme === 'dark' ? vscDarkPlus : oneLight;

  // Custom style based on chosen theme
  const customStyle = {
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
  };

  return (
    <div className="aspect-video bg-gray-100 dark:bg-gray-900 rounded-lg overflow-hidden shadow-xl relative group border border-gray-200 dark:border-gray-700">
      {/* Code Editor Header */}
      <div className="bg-gray-200 dark:bg-gray-800 px-4 py-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <div className="text-xs text-gray-600 dark:text-gray-400 font-mono">{title}</div>
      </div>

      {/* Code Content */}
      <div className="p-4 relative overflow-auto">
        {/* Background Pattern */}
        <svg className="absolute inset-0 w-full h-full opacity-5" viewBox="0 0 400 300">
          <pattern id={`code-pattern-${index}`} x="0" y="0" width="50" height="50" patternUnits="userSpaceOnUse">

          </pattern>
          <rect width="100%" height="100%" fill={`url(#code-pattern-${index})`} />
        </svg>

        {/* Syntax Highlighted Code */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
          className="relative z-10"
        >
          <SyntaxHighlighter
            language="java"
            style={customStyle}
            showLineNumbers
            lineNumberStyle={{ color: theme === 'dark' ? '#4a5568' : '#9ca3af', marginRight: '1rem', minWidth: '2em' }}
            wrapLines={true}
            customStyle={{ background: 'transparent', padding: 0 }}
          >
            {codeString}
          </SyntaxHighlighter>
        </motion.div>
      </div>
    </div>
  );
};

export default ProjectPlaceholder;

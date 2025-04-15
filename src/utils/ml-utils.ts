
type UserPreference = {
  category: string;
  interest: number; // 0-100 scale
};

type ContentItem = {
  id: string;
  title: string;
  category: string;
  tags: string[];
  popularity: number; // 0-100 scale
};

// Simplified content recommendation algorithm
export const recommendContent = (
  userPreferences: UserPreference[], 
  availableContent: ContentItem[],
  maxResults: number = 5
): ContentItem[] => {
  // Create a scoring function based on user preferences
  const scoreContent = (content: ContentItem): number => {
    let score = content.popularity * 0.3; // Base score is 30% influenced by popularity
    
    // Add scores based on user preferences
    userPreferences.forEach(pref => {
      if (content.category === pref.category) {
        score += pref.interest * 0.5; // 50% influence from direct category match
      }
      
      // Add smaller boosts for tag matches
      if (content.tags.includes(pref.category)) {
        score += pref.interest * 0.2; // 20% influence from tag match
      }
    });
    
    return score;
  };
  
  // Score all content
  const scoredContent = availableContent.map(content => ({
    ...content,
    score: scoreContent(content)
  }));
  
  // Sort by score (highest first) and take the requested number
  return scoredContent
    .sort((a, b) => b.score - a.score)
    .slice(0, maxResults)
    .map(({ score, ...content }) => content); // Remove the score before returning
};

// Infer user preferences from behavior
export const inferUserPreferences = (
  clickData: Array<{ contentId: string, category: string, time: number }>,
  viewData: Array<{ contentId: string, category: string, duration: number }>
): UserPreference[] => {
  const categoryScores: Record<string, { clicks: number, viewTime: number }> = {};
  
  // Process click data
  clickData.forEach(click => {
    if (!categoryScores[click.category]) {
      categoryScores[click.category] = { clicks: 0, viewTime: 0 };
    }
    categoryScores[click.category].clicks += 1;
  });
  
  // Process view data
  viewData.forEach(view => {
    if (!categoryScores[view.category]) {
      categoryScores[view.category] = { clicks: 0, viewTime: 0 };
    }
    categoryScores[view.category].viewTime += view.duration;
  });
  
  // Normalize scores to 0-100 scale
  const maxClicks = Math.max(...Object.values(categoryScores).map(s => s.clicks || 1));
  const maxViewTime = Math.max(...Object.values(categoryScores).map(s => s.viewTime || 1));
  
  return Object.entries(categoryScores).map(([category, scores]) => {
    // Calculate interest as weighted combination of normalized click and view scores
    const normalizedClicks = (scores.clicks / maxClicks) * 100;
    const normalizedViewTime = (scores.viewTime / maxViewTime) * 100;
    const interest = Math.round((normalizedClicks * 0.4) + (normalizedViewTime * 0.6));
    
    return {
      category,
      interest
    };
  });
};

// Mock function to simulate ML-driven UI optimization suggestions
export const getUIOptimizationSuggestions = (): Array<{ element: string, suggestion: string, confidence: number }> => {
  return [
    { 
      element: "Call to Action Button", 
      suggestion: "Move to top-right of hero section; change color to coral (#f97316)",
      confidence: 87
    },
    { 
      element: "Product Images", 
      suggestion: "Increase size by 15%; add subtle shadow for depth",
      confidence: 82
    },
    { 
      element: "Navigation Menu", 
      suggestion: "Simplify to 5 main items; use dropdown for others",
      confidence: 76
    },
    { 
      element: "Testimonial Section", 
      suggestion: "Move above the fold on mobile devices",
      confidence: 71
    },
    { 
      element: "Form Fields", 
      suggestion: "Reduce required fields from 7 to 4",
      confidence: 89
    }
  ];
};

// Simplified A/B test statistical significance calculator
export const calculateABTestSignificance = (
  controlUsers: number,
  controlConversions: number,
  variantUsers: number,
  variantConversions: number
): { significant: boolean, confidenceLevel: number, relativeImprovement: number } => {
  const controlRate = controlConversions / controlUsers;
  const variantRate = variantConversions / variantUsers;
  
  // Calculate standard error
  const controlSE = Math.sqrt((controlRate * (1 - controlRate)) / controlUsers);
  const variantSE = Math.sqrt((variantRate * (1 - variantRate)) / variantUsers);
  
  // Z-score for the difference
  const zScore = Math.abs(variantRate - controlRate) / Math.sqrt(controlSE * controlSE + variantSE * variantSE);
  
  // Convert z-score to confidence level
  // This is a simplified approximation
  let confidenceLevel = 0;
  if (zScore > 2.576) confidenceLevel = 99;
  else if (zScore > 1.96) confidenceLevel = 95;
  else if (zScore > 1.645) confidenceLevel = 90;
  else if (zScore > 1.28) confidenceLevel = 80;
  else confidenceLevel = 70;
  
  // Calculate relative improvement
  const relativeImprovement = ((variantRate - controlRate) / controlRate) * 100;
  
  return {
    significant: confidenceLevel >= 95, // Usually 95% is the threshold
    confidenceLevel,
    relativeImprovement
  };
};

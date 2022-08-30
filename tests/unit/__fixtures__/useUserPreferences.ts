import { UserPreferencesValue } from '../../../src/providers/UserPreferences'

const useUserPreferences: UserPreferencesValue = {
  debug: false,
  currency: 'EUR',
  locale: 'de',
  chainIds: [1],
  bookmarks: [],
  privacyPolicySlug: '/privacy/en',
  showPPC: false,
  infiniteApproval: false,
  setChainIds: jest.fn(),
  setCurrency: jest.fn(),
  setPrivacyPolicySlug: jest.fn(),
  setDebug: jest.fn(),
  setShowPPC: jest.fn(),
  addBookmark: jest.fn(),
  removeBookmark: jest.fn(),
  setInfiniteApproval: jest.fn(),
  onboardingStep: 0,
  setOnboardingStep: jest.fn(),
  isSearchBarVisible: false,
  setSearchBarVisible: jest.fn(),
  isScrollingToSearchBar: false,
  setIsScrollingToSearchBar: jest.fn()
}

export default useUserPreferences

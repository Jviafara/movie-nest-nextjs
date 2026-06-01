import { Heart, House, LucideIcon, Search, Sliders, Star, Tv } from 'lucide-react'

export interface IMenuConfig {
  display: string
  path: string
  icon: LucideIcon
  state: string
}

const main = [
  {
    display: 'home',
    path: '/',
    icon: House,
    state: 'home',
  },
  {
    display: 'movies',
    path: '/movie',
    icon: Sliders,
    state: 'movie',
  },
  {
    display: 'tv series',
    path: '/tv',
    icon: Tv,
    state: 'tv',
  },
  {
    display: 'search',
    path: '/search',
    icon: Search,
    state: 'search',
  },
]

const user = [
  {
    display: 'favorites',
    path: '/favorites',
    icon: Heart,
    state: 'favorites',
  },
  {
    display: 'reviews',
    path: '/reviews',
    icon: Star,
    state: 'reviews',
  },
]

const menuConfigs = { main, user }

export default menuConfigs

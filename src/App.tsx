import { useRoutes } from 'react-router-dom'
import routes from '@/router'

export default () => {
  const app = useRoutes(routes)
  return app
}

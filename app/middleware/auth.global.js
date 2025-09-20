export default defineNuxtRouteMiddleware(async (to, from) => {
  if (to.path.startsWith('/api') || to.path === '/version') {
    return
  }
  const sessionId = useCookie('ProcurementAuth').value
  if (sessionId === null) {
    if (to.path !== '/login') {
      return navigateTo('/login')
    }
    return
  }
  const user = useState('userInfo', () => null)
  const { data, error } = await useFetch('/api/auth/profile', {
    method: 'GET',
    credentials: 'include'
  })
  user.value = data.value
  const isLoggedIn = !error.value && user.value && !user.value.error

  if (!isLoggedIn) {
    if (to.path !== '/login') {
      useCookie('ProcurementAuth').value = null
      return navigateTo('/login')
    }
    return
  }

  const authLevel = user.value?.user_level ?? 0

  if (to.path === '/' || to.path === '/login') {
    if (authLevel >= 2) {
      return navigateTo('/auth/admin')
    } else {
      return navigateTo('/auth')
    }
  }

  if (to.path.startsWith('/auth/admin') && authLevel < 2) {
    return navigateTo('/auth')
  }
})

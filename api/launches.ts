const getLaunches = async () => {
  const response = await fetch('https://api.spacexdata.com/v4/launches')
  const data = await response.json()

  return data
}

export { getLaunches }

const getLaunches = async () => {
  await delay(200 + Math.floor(Math.random() * 2000))

  const response = await fetch('https://api.spacexdata.com/v4/launches')

  return response.json()
}

const delay = (t: number) => {
  return new Promise(resolve => {
    setTimeout(resolve, t)
  })
}

export { getLaunches }

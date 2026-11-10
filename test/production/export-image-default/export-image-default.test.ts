import { nextTestSetup } from 'e2e-utils'

describe('Export with default loader next/image component', () => {
  const { next } = nextTestSetup({
    files: __dirname,
    skipStart: true,
  })

  it('should error during next build', async () => {
    const { exitCode } = await next.build()
    expect(next.cliOutput).toContain(
      'Image Optimization using the default loader is not compatible with export.'
    )
    expect(exitCode).toBe(1)
  })

  it('should error during next build for app router', async () => {
    await next.renameFolder('pages', 'pages_hidden')
    await next.patchFile(
      'app/page.js',
      `import Image from 'next/image'
export default function Page() {
  return (
    <div>
      <p>Should error during export</p>
      <Image src="/i.png" width="10" height="10" alt="test" />
    </div>
  )
}`
    )
    const { exitCode } = await next.build()
    expect(next.cliOutput).toContain(
      'Image Optimization using the default loader is not compatible with'
    )
    expect(exitCode).toBe(1)
  })
})

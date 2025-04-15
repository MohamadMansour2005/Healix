import { NextResponse } from 'next/server'
import { sendVerificationEmail } from '@/lib/verify'
import { prisma } from '@/lib/prisma'
import crypto from 'crypto'

export async function POST(request: Request) {
  console.log('Verification email endpoint hit!')

  try {
    const { email } = await request.json()
    console.log('Processing verification for email:', email)

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      )
    }

    // Check if user exists
    let user = await prisma.user.findUnique({
      where: { email },
    })

    console.log('Found existing user:', user)

    if (!user) {
      return NextResponse.json(
        { error: 'No user found with that email' },
        { status: 404 }
      )
    }

    // Generate verification token and expiry
    const verificationToken = crypto.randomUUID()
    const verificationTokenExpiry = new Date(Date.now() + 60 * 60 * 1000) // 1 hour

    console.log('Generated verification token:', verificationToken)

    // Save token to user
    await prisma.user.update({
      where: { id: user.id },
      data: {
        verificationToken,
        verificationTokenExpiry,
      },
    })

    console.log('Updated user with verification token')

    // Send verification email
    await sendVerificationEmail(email, verificationToken)
    console.log('Verification email sent successfully')

    return NextResponse.json({
      message: 'Verification email sent successfully',
    })
  } catch (error: any) {
    console.error('Verification error:', error)
    return NextResponse.json(
      {
        error: 'Failed to send verification email',
        details: error.message,
      },
      { status: 500 }
    )
  }
}

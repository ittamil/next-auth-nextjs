let policy = {
  userAgent:'*'
}

if (process.env.NODE_ENV!=='production'){
  policy.disallow='/';
}
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL
module.exports = {
  siteUrl,
  generateRobotsTxt: true,
  robotsTxtOptions:{
    policies:[
      policy
    ],
  additionalSitemaps: [
    `${siteUrl}/server-sitemap.xml`,
    `${siteUrl}/sitemap.xml`
  ],}
}

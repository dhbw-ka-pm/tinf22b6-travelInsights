<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
                xmlns:xs="http://www.w3.org/2001/XMLSchema"
                xmlns:array="http://www.w3.org/2005/xpath-functions/array"
                xmlns:map="http://www.w3.org/2005/xpath-functions/map"
                xmlns:math="http://www.w3.org/2005/xpath-functions/math"
                version="1.0">
    
    <xsl:output method="xml" indent="yes" encoding="UTF-8"/>
    
    <xsl:template match="weatherReports">
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="400" height="300">
            <xsl:for-each select="report">
                <text x="{20 + 130 * (position() -1)}" y="30" font-size="16"><xsl:value-of select="date"/> </text>
                <xsl:choose>
                    <xsl:when test="weatherCode = 0">
                        <image href="/weatherIcons/0.png" xlink:href="/weatherIcons/0.png" x="{20 + 130 * (position() -1)}" y="40" width="100" height="100" />
                    </xsl:when>
                    <xsl:when test="weatherCode &lt; 3">
                        <image href="/weatherIcons/2.png" xlink:href="/weatherIcons/2.png" x="{20 + 130 * (position() -1)}" y="40" width="100" height="100" />
                    </xsl:when>
                    <xsl:when test="weatherCode &lt; 4">
                        <image href="/weatherIcons/3.png" xlink:href="/weatherIcons/3.png" x="{20 + 130 * (position() -1)}" y="40" width="100" height="100" />
                    </xsl:when>
                    <xsl:when test="weatherCode &lt; 50">
                        <image href="/weatherIcons/4.png" xlink:href="/weatherIcons/4.png" x="{20 + 130 * (position() -1)}" y="40" width="100" height="100" />
                    </xsl:when>
                    <xsl:when test="weatherCode &lt; 70">
                        <image href="/weatherIcons/50.png" xlink:href="/weatherIcons/50.png" x="{20 + 130 * (position() -1)}" y="40" width="100" height="100" />
                    </xsl:when>
                    <xsl:when test="weatherCode &lt; 80">
                        <image href="/weatherIcons/70.png" xlink:href="/weatherIcons/70.png" x="{20 + 130 * (position() -1)}" y="40" width="100" height="100" />
                    </xsl:when>
                    <xsl:when test="weatherCode &lt; 90">
                        <image href="/weatherIcons/80.png" xlink:href="/weatherIcons/80.png" x="{20 + 130 * (position() -1)}" y="40" width="100" height="100" />
                    </xsl:when>
                    <xsl:when test="weatherCode &lt; 100">
                        <image href="/weatherIcons/95.png" xlink:href="/weatherIcons/95.png" x="{20 + 130 * (position() -1)}" y="40" width="100" height="100" />
                    </xsl:when>
                </xsl:choose>
                <text x="{20 + 130* (position() -1)}" y="160" font-size="14" fill="red">Max.: <xsl:value-of select="maxTemp"/>°C</text>
                <text x="{20 + 130* (position() -1)}" y="180" font-size="14" fill="#272a53">Min.: <xsl:value-of select="minTemp"/>°C</text>
            </xsl:for-each>
        </svg>
    </xsl:template>
    
    
</xsl:stylesheet>
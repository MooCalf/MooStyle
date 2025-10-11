// Search Analytics Dashboard
// Industry-standard search analytics and insights

import React, { useState, useEffect } from 'react';
import { BarChart3, TrendingUp, Search, Clock, Star, Users, Eye, MousePointer } from 'lucide-react';
import { motion } from 'framer-motion';

const SearchAnalytics = ({ searchEngine, className = "" }) => {
  const [analytics, setAnalytics] = useState(null);
  const [timeRange, setTimeRange] = useState('week');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadAnalytics();
  }, [searchEngine, timeRange]);

  const loadAnalytics = () => {
    setIsLoading(true);
    
    try {
      const data = searchEngine.getAnalytics();
      const processedData = processAnalyticsData(data);
      setAnalytics(processedData);
    } catch (error) {
      console.error('Failed to load analytics:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const processAnalyticsData = (rawData) => {
    const now = Date.now();
    const timeRanges = {
      day: 24 * 60 * 60 * 1000,
      week: 7 * 24 * 60 * 60 * 1000,
      month: 30 * 24 * 60 * 60 * 1000
    };

    const cutoffTime = now - timeRanges[timeRange];
    const recentSearches = rawData.searches.filter(search => 
      search.timestamp >= cutoffTime
    );

    // Calculate metrics
    const totalSearches = recentSearches.length;
    const uniqueQueries = new Set(recentSearches.map(s => s.query)).size;
    const avgResultsPerSearch = recentSearches.reduce((sum, s) => sum + (s.results || 0), 0) / totalSearches || 0;
    
    // Top queries
    const queryCounts = recentSearches.reduce((acc, search) => {
      acc[search.query] = (acc[search.query] || 0) + 1;
      return acc;
    }, {});

    const topQueries = Object.entries(queryCounts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 10)
      .map(([query, count]) => ({ query, count }));

    // Search trends over time
    const trends = calculateTrends(recentSearches, timeRange);

    // Popular content
    const popularContent = rawData.popularItems.slice(0, 10);

    // Search success rate
    const successfulSearches = recentSearches.filter(s => s.results > 0).length;
    const successRate = totalSearches > 0 ? (successfulSearches / totalSearches) * 100 : 0;

    return {
      totalSearches,
      uniqueQueries,
      avgResultsPerSearch: Math.round(avgResultsPerSearch * 10) / 10,
      successRate: Math.round(successRate * 10) / 10,
      topQueries,
      trends,
      popularContent,
      timeRange
    };
  };

  const calculateTrends = (searches, range) => {
    const now = Date.now();
    const intervals = {
      day: 60 * 60 * 1000, // 1 hour intervals
      week: 24 * 60 * 60 * 1000, // 1 day intervals
      month: 7 * 24 * 60 * 60 * 1000 // 1 week intervals
    };

    const interval = intervals[range];
    const buckets = {};

    searches.forEach(search => {
      const bucket = Math.floor(search.timestamp / interval) * interval;
      buckets[bucket] = (buckets[bucket] || 0) + 1;
    });

    return Object.entries(buckets)
      .sort(([a], [b]) => a - b)
      .map(([timestamp, count]) => ({
        timestamp: parseInt(timestamp),
        count
      }));
  };

  const formatTimeRange = (range) => {
    switch (range) {
      case 'day': return 'Last 24 Hours';
      case 'week': return 'Last 7 Days';
      case 'month': return 'Last 30 Days';
      default: return 'Last 7 Days';
    }
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    switch (timeRange) {
      case 'day':
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      case 'week':
        return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
      case 'month':
        return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
      default:
        return date.toLocaleDateString();
    }
  };

  if (isLoading) {
    return (
      <div className={`bg-white rounded-lg shadow-sm border border-gray-200 p-6 ${className}`}>
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!analytics) {
    return (
      <div className={`bg-white rounded-lg shadow-sm border border-gray-200 p-6 ${className}`}>
        <div className="text-center text-gray-500">
          <Search className="w-12 h-12 mx-auto mb-4 text-gray-300" />
          <p>No search analytics available yet.</p>
          <p className="text-sm mt-2">Start searching to see insights!</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-white rounded-lg shadow-sm border border-gray-200 ${className}`}>
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center">
            <BarChart3 className="w-5 h-5 mr-2 text-teal-600" />
            Search Analytics
          </h3>
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="text-sm border border-gray-300 rounded-md px-3 py-1 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
          >
            <option value="day">Last 24 Hours</option>
            <option value="week">Last 7 Days</option>
            <option value="month">Last 30 Days</option>
          </select>
        </div>
        <p className="text-sm text-gray-600 mt-1">
          {formatTimeRange(timeRange)} • {analytics.totalSearches} total searches
        </p>
      </div>

      {/* Metrics Grid */}
      <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-lg"
        >
          <div className="flex items-center">
            <Search className="w-8 h-8 text-blue-600" />
            <div className="ml-3">
              <p className="text-sm font-medium text-blue-600">Total Searches</p>
              <p className="text-2xl font-bold text-blue-900">{analytics.totalSearches}</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-r from-green-50 to-green-100 p-4 rounded-lg"
        >
          <div className="flex items-center">
            <TrendingUp className="w-8 h-8 text-green-600" />
            <div className="ml-3">
              <p className="text-sm font-medium text-green-600">Unique Queries</p>
              <p className="text-2xl font-bold text-green-900">{analytics.uniqueQueries}</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-r from-purple-50 to-purple-100 p-4 rounded-lg"
        >
          <div className="flex items-center">
            <MousePointer className="w-8 h-8 text-purple-600" />
            <div className="ml-3">
              <p className="text-sm font-medium text-purple-600">Success Rate</p>
              <p className="text-2xl font-bold text-purple-900">{analytics.successRate}%</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-gradient-to-r from-orange-50 to-orange-100 p-4 rounded-lg"
        >
          <div className="flex items-center">
            <Eye className="w-8 h-8 text-orange-600" />
            <div className="ml-3">
              <p className="text-sm font-medium text-orange-600">Avg Results</p>
              <p className="text-2xl font-bold text-orange-900">{analytics.avgResultsPerSearch}</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Charts and Lists */}
      <div className="p-6 space-y-6">
        {/* Search Trends */}
        {analytics.trends.length > 0 && (
          <div>
            <h4 className="text-md font-semibold text-gray-900 mb-4 flex items-center">
              <TrendingUp className="w-4 h-4 mr-2 text-teal-600" />
              Search Trends
            </h4>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-end space-x-1 h-32">
                {analytics.trends.map((trend, index) => {
                  const maxCount = Math.max(...analytics.trends.map(t => t.count));
                  const height = (trend.count / maxCount) * 100;
                  
                  return (
                    <motion.div
                      key={index}
                      initial={{ height: 0 }}
                      animate={{ height: `${height}%` }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                      className="bg-teal-500 rounded-t flex-1 min-h-[4px]"
                      title={`${formatTimestamp(trend.timestamp)}: ${trend.count} searches`}
                    />
                  );
                })}
              </div>
              <div className="flex justify-between text-xs text-gray-500 mt-2">
                <span>{formatTimestamp(analytics.trends[0]?.timestamp)}</span>
                <span>{formatTimestamp(analytics.trends[analytics.trends.length - 1]?.timestamp)}</span>
              </div>
            </div>
          </div>
        )}

        {/* Top Queries */}
        {analytics.topQueries.length > 0 && (
          <div>
            <h4 className="text-md font-semibold text-gray-900 mb-4 flex items-center">
              <Search className="w-4 h-4 mr-2 text-teal-600" />
              Top Search Queries
            </h4>
            <div className="space-y-2">
              {analytics.topQueries.map((query, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center">
                    <span className="text-sm font-medium text-gray-600 w-6">#{index + 1}</span>
                    <span className="text-sm text-gray-900 ml-2">{query.query}</span>
                  </div>
                  <span className="text-sm font-semibold text-teal-600">{query.count} searches</span>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Popular Content */}
        {analytics.popularContent.length > 0 && (
          <div>
            <h4 className="text-md font-semibold text-gray-900 mb-4 flex items-center">
              <Star className="w-4 h-4 mr-2 text-teal-600" />
              Most Clicked Content
            </h4>
            <div className="space-y-2">
              {analytics.popularContent.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center">
                    <span className="text-sm font-medium text-gray-600 w-6">#{index + 1}</span>
                    <div className="ml-2">
                      <span className="text-sm text-gray-900">{item.item?.title || 'Unknown'}</span>
                      <span className="text-xs text-gray-500 ml-2 capitalize">({item.item?.type})</span>
                    </div>
                  </div>
                  <span className="text-sm font-semibold text-teal-600">{item.clicks} clicks</span>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchAnalytics;

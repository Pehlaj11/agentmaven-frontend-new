// Reusable badge for status labels
import React from 'react';
import CallStatusBadge from './CallStatusBadge';

export default function StatusBadge({ status }) {
  return <CallStatusBadge status={status} />;
}

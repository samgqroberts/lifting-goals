import React, { ReactNode } from 'react';

import { Portal } from './Portal';
import { useWindowDimensions } from './useWindowDimensions';

export const Modal: React.FC<{
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  iconSize?: number;
  iconColor?: string;
}> = ({ open, onClose, children, iconSize = 24, iconColor = '#777' }) => {
  const { width } = useWindowDimensions();
  const maxWidth = 780;
  const minMarginSide = 30;
  return (
    <React.Fragment>
      {open && (
        <Portal className="modal-portal">
          {/* overall */}
          <div
            style={{
              display: 'flex',
              position: 'fixed',
              left: 0,
              top: 0,
              right: 0,
              bottom: 0,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {/* backdrop */}
            <button
              style={{
                position: 'absolute',
                left: 0,
                top: 0,
                right: 0,
                bottom: 0,
                background: 'black',
                opacity: 0.3,
              }}
              onClick={() => onClose()}
            />
            {/* content */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                maxHeight: 'calc(100% - 60px)',
                maxWidth: width < maxWidth + minMarginSide * 2 ? `calc(100% - ${minMarginSide * 2}px)` : maxWidth,
                zIndex: 2,
                background: 'white',
                borderRadius: 6,
              }}
            >
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  flexGrow: 1,
                  overflowY: 'auto',
                }}
              >
                {children}
              </div>
              <div style={{ display: 'flex', marginTop: 5, marginBottom: 15 }}>
                <button
                  style={{
                    display: 'flex',
                    borderRadius: '50%',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: iconSize,
                    height: iconSize,
                    border: `1px solid ${iconColor}`,
                    color: iconColor,
                    background: 'transparent',
                    marginLeft: 'auto',
                    marginRight: 15,
                  }}
                  onClick={() => onClose()}
                >
                  X
                </button>
              </div>
            </div>
          </div>
        </Portal>
      )}
    </React.Fragment>
  );
};

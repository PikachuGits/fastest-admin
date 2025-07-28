import * as React from 'react';
import { ThemeProvider, useTheme } from '@mui/material/styles';
import type { Theme, SxProps } from '@mui/material/styles';
import {
    CssBaseline,
    Paper,
    Divider,
    Box,
    Typography,
    List,
    ListItem,
    Collapse,
    ListSubheader,
    ListItemButton,
    ListItemIcon,
    ListItemText,
} from '@mui/material';
import { styled } from '@mui/material/styles';



// 定义组件属性接口
interface IconifyProps {
    icon: string;
    sx?: SxProps<Theme>;
    [key: string]: any;
}

interface SvgColorProps {
    src: string;
    sx?: SxProps<Theme>;
    [key: string]: any;
}

interface LabelProps {
    children: React.ReactNode;
    color?: 'default' | 'error' | 'info';
    sx?: SxProps<Theme>;
    [key: string]: any;
}
// ==============================================================================
// 1. Helper Components (Iconify, SvgColor, Label)
//    These would typically be in their own files (e.g., components/Iconify.js)
// ==============================================================================

// Iconify component to render SVG icons (for arrows and ListSubheader icon)
// It handles SVG paths by converting them to data URLs for mask-image.
function Iconify({ icon, sx, ...other }: IconifyProps) {
    const isSvgPath = icon && icon.startsWith('M'); // Check if the icon string is an SVG path
    const svgUrl = isSvgPath
        ? `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="${icon}"></path></svg>`
        : icon; // Assume 'icon' is already a URL for mask-image

    return (
        <Box
            component="span"
            sx={{
                width: 16, // Default for minimal__iconify__root and minimal__nav__item__arrow
                height: 16,
                display: 'inline-flex',
                flexShrink: 0,
                bgcolor: 'currentColor', // Allows icon color to be inherited from text color
                mask: `url("${svgUrl}") no-repeat center / contain`,
                WebkitMask: `url("${svgUrl}") no-repeat center / contain`,
                ...(sx || {}),
            }}
            {...other}
        />
    );
}

// SvgColor component for the colored dot icons next to primary nav items
// It uses a mask image to represent the icon shape and applies a background color.
function SvgColor({ src, sx, ...other }: SvgColorProps) {
    return (
        <Box
            component="span"
            sx={{
                width: 24, // Default from css-raduy6 etc.
                height: 24,
                display: 'inline-flex',
                flexShrink: 0,
                bgcolor: 'currentColor', // Allows the "color" of the svg to be inherited
                mask: `url(${src}) no-repeat center / contain`,
                WebkitMask: `url(${src}) no-repeat center / contain`,
                ...(sx || {}),
            }}
            {...other}
        />
    );
}

// Label component for info badges (+2, +3, +4)
function Label({ children, color = 'default', sx, ...other }: LabelProps) {
    const theme = useTheme();
    const bgColor: Record<string, string> = {
        error: `rgba(255, 86, 48, ${theme.vars.customVars['--opacity-soft-bg']})`,
        info: `rgba(0, 184, 217, ${theme.vars.customVars['--opacity-soft-bg']})`,
    };
    const textColor: Record<string, string> = {
        error: theme.palette.error.dark,
        info: theme.palette.info.dark,
    };

    return (
        <Box
            component="span"
            sx={{
                display: 'inline-flex',
                flexShrink: 0,
                fontSize: 12,
                lineHeight: 1.5,
                fontWeight: 700,
                borderRadius: '6px',
                cursor: 'default',
                minWidth: '24px',
                alignItems: 'center',
                whiteSpace: 'nowrap', // Equivalent to white-space-collapse: collapse and text-wrap-mode: nowrap
                columnGap: '6px',
                rowGap: '6px',
                justifyContent: 'center',
                padding: `0 ${theme.spacing(0.75)}`,
                backgroundColor: bgColor[color] || 'transparent',
                color: textColor[color] || 'inherit',
                ...(sx || {}),
            }}
            {...other}
        >
            {children}
        </Box>
    );
}

// ==============================================================================
// 2. Theme Definition
// ==============================================================================

import { lightTheme } from '@/app/providers/theme';

// ==============================================================================
// 3. Styled Components for specific HTML elements
// ==============================================================================

const StyledPaper = styled(Paper)(({ theme }) => ({
    // borderRadius: theme.shape.borderRadius * 1.5,
    maxWidth: 320,
    padding: theme.spacing(2),
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
}));

const StyledNav = styled('nav')({
    flex: '1 1 auto',
});

const StyledList = styled(List)(({ theme }) => ({
    columnGap: theme.spacing(0.5),
    display: 'flex',
    flex: '1 1 auto',
    flexDirection: 'column',
    rowGap: theme.spacing(0.5),
    padding: 0, // Remove default List padding
}));

const StyledListItem = styled(ListItem)({
    display: 'inline-block', // Matches css-233int and css-1c5mwwi
    padding: 0, // Remove default ListItem padding
});

// Styled list for nested items which have the vertical line and bullet points
const StyledNestedList = styled(StyledList)(({ theme }) => ({
    paddingLeft: '12px', // This is the padding to make space for the bullet
    position: 'relative',
    '&::before': {
        backgroundColor: '#EDEFF2',
        bottom: `calc(36px - 2px - 6px)`, // Adjust bottom to align with the list items
        content: '""',
        left: 0,
        position: 'absolute',
        top: 0,
        width: '2px',
    },
}));

// ==============================================================================
// 4. Data Structure for Navigation Items
// ==============================================================================

interface NavItem {
    title: string;
    href?: string;
    caption?: string;
    info?: string;
    infoColor?: 'error' | 'info';
    iconSrc?: string;
    disabled?: boolean;
    open?: boolean;
    active?: boolean;
    children?: NavItem[];
}

interface NavSection {
    subheader: string;
    subheaderIconPath: string;
    items: NavItem[];
}

const navConfig: NavSection[] = [
    {
        subheader: 'Marketing',
        subheaderIconPath: 'M12 16a1 1 0 0 1-.64-.23l-6-5a1 1 0 1 1 1.28-1.54L12 13.71l5.36-4.32a1 1 0 0 1 1.41.15a1 1 0 0 1-.14 1.46l-6 4.83A1 1 0 0 1 12 16', // Down arrow SVG path
        items: [
            {
                title: 'Landing',
                href: 'https://minimals.cc/components/extra/navigation-bar',
                info: '+2',
                infoColor: 'error',
                iconSrc: 'https://pub-c5e31b5cdafb419fb247a8ac2e78df7a.r2.dev/public/assets/icons/navbar/ic-dashboard.svg',
            },
            {
                title: 'Services',
                href: 'https://minimals.cc/components/extra/navigation-bar',
                caption: 'Only admin can see this item.',
                iconSrc: 'https://pub-c5e31b5cdafb419fb247a8ac2e78df7a.r2.dev/public/assets/icons/navbar/ic-analytics.svg',
            },
            {
                title: 'Blog',
                href: '#', // No direct href, it's a collapsible parent
                caption: 'Only admin / manager can see this item.',
                info: '+3',
                infoColor: 'info',
                iconSrc: 'https://pub-c5e31b5cdafb419fb247a8ac2e78df7a.r2.dev/public/assets/icons/navbar/ic-blog.svg',
                children: [], // No children listed in the HTML for Blog, but it's collapsible
            },
        ],
    },
    {
        subheader: 'Travel',
        subheaderIconPath: 'M12 16a1 1 0 0 1-.64-.23l-6-5a1 1 0 1 1 1.28-1.54L12 13.71l5.36-4.32a1 1 0 0 1 1.41.15a1 1 0 0 1-.14 1.46l-6 4.83A1 1 0 0 1 12 16', // Down arrow SVG path
        items: [
            {
                title: 'About',
                href: 'https://minimals.cc/components/extra/navigation-bar',
                info: '+4',
                iconSrc: 'https://pub-c5e31b5cdafb419fb247a8ac2e78df7a.r2.dev/public/assets/icons/navbar/ic-user.svg',
            },
            {
                title: 'Contact',
                href: 'https://minimals.cc/components/extra/navigation-bar',
                disabled: true,
                iconSrc: 'https://pub-c5e31b5cdafb419fb247a8ac2e78df7a.r2.dev/public/assets/icons/navbar/ic-tour.svg',
            },
            {
                title: 'Level',
                href: '#',
                iconSrc: 'https://pub-c5e31b5cdafb419fb247a8ac2e78df7a.r2.dev/public/assets/icons/navbar/ic-menu-item.svg',
                open: true, // This item is open in the HTML
                active: true, // This item is active in the HTML
                children: [
                    {
                        title: 'Level 2a',
                        href: '#',
                        caption: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
                        iconSrc: 'https://pub-c5e31b5cdafb419fb247a8ac2e78df7a.r2.dev/public/assets/icons/navbar/ic-chat.svg',
                        open: true,
                        active: true,
                        children: [
                            {
                                title: 'Level 3a',
                                href: 'https://minimals.cc/components/extra/navigation-bar',
                            },
                            {
                                title: 'Level 3b',
                                href: '#',
                                open: true,
                                active: true,
                                children: [
                                    {
                                        title: 'Level 4a',
                                        href: 'https://minimals.cc/components/extra/navigation-bar',
                                        disabled: true,
                                    },
                                    {
                                        title: 'Level 4b',
                                        href: 'https://minimals.cc/components/extra/navigation-bar',
                                        open: true, // In the HTML, this item is 'open' and 'active' as a leaf node
                                        active: true,
                                    },
                                ],
                            },
                            {
                                title: 'Level 3c',
                                href: 'https://minimals.cc/components/extra/navigation-bar',
                            },
                        ],
                    },
                    {
                        title: 'Level 2b',
                        href: 'https://minimals.cc/components/extra/navigation-bar',
                        iconSrc: 'https://pub-c5e31b5cdafb419fb247a8ac2e78df7a.r2.dev/public/assets/icons/navbar/ic-mail.svg',
                    },
                    {
                        title: 'Level 2c',
                        href: 'https://minimals.cc/components/extra/navigation-bar',
                        iconSrc: 'https://pub-c5e31b5cdafb419fb247a8ac2e78df7a.r2.dev/public/assets/icons/navbar/ic-calendar.svg',
                    },
                ],
            },
            {
                title: 'More',
                href: 'https://minimals.cc/components/extra/navigation-bar',
                iconSrc: 'https://pub-c5e31b5cdafb419fb247a8ac2e78df7a.r2.dev/public/assets/icons/navbar/ic-blank.svg',
            },
        ],
    },
];

// Item outside of subheader groups
const chatItem = {
    title: 'Chat',
    href: 'https://minimals.cc/components/extra/navigation-bar',
    caption: 'Praesent porttitor nulla vitae posuere',
    iconSrc: 'https://pub-c5e31b5cdafb419fb247a8ac2e78df7a.r2.dev/public/assets/icons/navbar/ic-chat.svg',
};

// ==============================================================================
// 5. NavItem Component (Recursive)
// ==============================================================================

function NavItem({ item, level = 0 }: { item: NavItem; level?: number }) {
    const theme = useTheme();
    const { title, href, iconSrc, info, infoColor, caption, disabled, children, open = false, active = false } = item;
    const [isOpen, setIsOpen] = React.useState(open);

    const handleClick = () => {
        if (children) {
            setIsOpen((prev) => !prev);
        }
    };

    const hasChildren = !!children && children.length > 0;
    const isLink = !!href && !hasChildren;

    // Link component. In a real app, this would be `react-router-dom`'s Link.
    const LinkComponent = 'a';
    const linkProps = { href: href };

    const listItemButtonClasses = [
        'minimal__nav__item__root',
        active ? '--active' : '',
        isOpen ? '--open' : '',
        disabled ? '--disabled' : '',
        level > 0 ? 'nested' : '', // Indicate nesting for special styles
    ].filter(Boolean).join(' ');

    const isDeepNestedItem = level >= 2; // For Level 3a, 3b, 3c, 4a, 4b (which apply the bullet)

    return (
        <StyledListItem>
            <ListItemButton
                component={isLink ? LinkComponent : 'div'}
                {...linkProps}
                onClick={handleClick}
                aria-label={title}
                disabled={disabled}
                className={listItemButtonClasses}
                sx={{
                    minHeight: level === 0 ? theme.vars.customVars['--nav-item-root-height'] : theme.vars.customVars['--nav-item-sub-height'],
                    padding: level === 0 ? `${theme.vars.customVars['--nav-item-pt']} ${theme.vars.customVars['--nav-item-pr']} ${theme.vars.customVars['--nav-item-pb']} ${theme.vars.customVars['--nav-item-pl']}` : '4px 8px 4px 12px',
                    position: 'relative', // For the ::before pseudo-element
                    // Apply bullet pseudo-element for deep nested items
                    ...(isDeepNestedItem && {
                        '&::before': {
                            content: '""',
                            backgroundColor: theme.vars.customVars['--nav-bullet-light-color'],
                            height: theme.vars.customVars['--nav-bullet-size'],
                            width: theme.vars.customVars['--nav-bullet-size'],
                            position: 'absolute',
                            left: 0,
                            maskImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='14' fill='none' viewBox='0 0 14 14'%3E%3Cpath d='M1 1v4a8 8 0 0 0 8 8h4' stroke='%23efefef' stroke-width='2' stroke-linecap='round'/%3E%3C/svg%3E")`,
                            WebkitMaskPositionX: '50%',
                            WebkitMaskPositionY: '50%',
                            maskSize: '100%',
                            transform: `translate(calc(${parseInt(theme.vars.customVars['--nav-bullet-size'])}*-1px), calc(${parseInt(theme.vars.customVars['--nav-bullet-size'])}*-.4px))`,
                        },
                    }),
                }}
            >
                {/* Render icon only if not deeply nested (Level 0 and 1 items) */}
                {level < 2 && iconSrc && (
                    <ListItemIcon>
                        <SvgColor src={iconSrc} />
                    </ListItemIcon>
                )}
                <ListItemText
                    primary={<Typography component="span" className={active ? '--active' : ''}>{title}</Typography>}
                    secondary={caption && <Typography component="span">{caption}</Typography>}
                    primaryTypographyProps={{
                        className: `minimal__nav__item__title`,
                        sx: {
                            fontWeight: active ? theme.typography.subtitle1.fontWeight : theme.typography.subtitle2.fontWeight
                        }
                    }}
                    secondaryTypographyProps={{
                        className: 'minimal__nav__item__caption',
                    }}
                />
                {info && <Label color={infoColor}>{info}</Label>}
                {hasChildren && (
                    <Iconify
                        icon={isOpen
                            ? 'M12 16a1 1 0 0 1-.64-.23l-6-5a1 1 0 1 1 1.28-1.54L12 13.71l5.36-4.32a1 1 0 0 1 1.41.15a1 1 0 0 1-.14 1.46l-6 4.83A1 1 0 0 1 12 16' // Down arrow path
                            : 'M10 19a1 1 0 0 1-.64-.23a1 1 0 0 1-.13-1.41L13.71 12L9.39 6.63a1 1 0 0 1 .15-1.41a1 1 0 0 1 1.46.15l4.83 6a1 1 0 0 1 0 1.27l-5 6A1 1 0 0 1 10 19' // Right arrow path
                        }
                        className="minimal__nav__item__arrow"
                        sx={{
                            transform: isOpen ? 'rotate(0deg)' : 'rotate(-90deg)', // Rotate for transition
                            ml: 'auto', // Push arrow to the right
                            width: 16, height: 16 // Ensure arrow icon size is 16px
                        }}
                    />
                )}
            </ListItemButton>
            {hasChildren && (
                <Collapse in={isOpen} timeout="auto" unmountOnExit
                    sx={{
                        paddingLeft: level === 0 ? `calc(${theme.vars.customVars['--nav-item-pl']} + ${parseInt(theme.vars.customVars['--nav-icon-size'])}/2px)` : 0,
                        // The paddingLeft for nested collapses depends on the level.
                        // Level 0 Collapse (Marketing/Travel) will have padding for the icon space.
                        // Deeper Collapses (Level, Level 2a) will have less or no direct padding from here,
                        // as the StyledNestedList itself provides the bullet and padding.
                    }}
                >
                    {/* Use StyledNestedList for deep nesting to get the vertical line and bullet point alignment */}
                    <StyledNestedList disablePadding>
                        {children.map((child: NavItem, index: number) => (
                            <NavItem key={child.title} item={child} level={level + 1} />
                        ))}
                    </StyledNestedList>
                </Collapse>
            )}
        </StyledListItem>
    );
}

// ==============================================================================
// 6. Main Navigation Component
// ==============================================================================

export const Navigation = () => {
    return (
        <ThemeProvider theme={lightTheme}>
            <CssBaseline />
            <StyledPaper variant="outlined">
                <StyledNav>
                    <StyledList>
                        {navConfig.map((section, index) => (
                            <React.Fragment key={section.subheader}>
                                <StyledListItem>
                                    <ListSubheader data-title={section.subheader}>
                                        <Iconify icon={section.subheaderIconPath} className="minimal__iconify__root" />
                                        {section.subheader}
                                    </ListSubheader>
                                    {/* The top-level collapse seems to always be open in the provided HTML */}
                                    <Collapse in={true} timeout="auto" unmountOnExit>
                                        <Box sx={{ width: '100%' }}> {/* equivalent to MuiCollapse-wrapper and MuiCollapse-wrapperInner */}
                                            <StyledList disablePadding>
                                                {section.items.map((item: NavItem) => (
                                                    <NavItem key={item.title} item={item} level={0} />
                                                ))}
                                            </StyledList>
                                        </Box>
                                    </Collapse>
                                </StyledListItem>
                            </React.Fragment>
                        ))}
                    </StyledList>
                </StyledNav>
                <Divider sx={{ my: 2 }} /> {/* Margin bottom/top from CSS-wos362 */}
                {/* The chat item is a single, non-collapsible item outside the main sections */}
                <NavItem item={chatItem} level={0} />
            </StyledPaper>
        </ThemeProvider>
    );
}